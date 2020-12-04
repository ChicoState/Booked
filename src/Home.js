import React from "react";
import app from "./firebase";
import firebase from "./firebase";
import 'firebase/database';
//import main.css

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '', isSignedIn : false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

loadDB() {
  const itemsRef = app.database().ref('text');
  itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
    let newState = [];
    if(firebase.auth().currentUser) {
      for (let item in items) {
        if(items[item].uid===firebase.auth().currentUser.uid) {
          newState.push({
            id: items[item].id,
            text: items[item].text,
            key: item,
          });
        }
      }
    }
    this.setState({
      items: newState
    });
  });
}

  componentDidMount = () => {

    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user})
      console.log("user", user)
    })
    this.loadDB();
  }

  componentDidUpdate(prevProps,prevState) {
    if (this.state.isSignedIn !== prevState.isSignedIn) {
      this.loadDB();
    }
  }

  delete(id, key){
    this.setState({
      items: this.state.items.filter((x) => x.id != id )
    });
    app.database().ref('/text/' + key).remove();
  }


  // status(){
  //   firebase.auth().onAuthStateChanged(function(user){
  //     if(user)
  //     {
  //       console.log("currently signed in");
  //       firebase.auth().signOut();
  //     }
  //     else
  //     {
  //       console.log("not signed in");
  //       // var provider = new firebase.auth.GoogleAuthProvider();
  //       // firebase.auth().signInWithPopup(provider);
  //     }
  //   });
  // }

  render() {
    //let button = <button onClick={this.status}>TEST</button>

    return (
      this.state.isSignedIn
      ?<div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} delete={this.delete.bind(this)} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            What needs to be done?
          </label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form>
      </div>
      :
        <div></div>


    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const itemsRef = app.database().ref('text');
    const newItem = {
      text: this.state.text,
      uid: firebase.auth().currentUser.uid,
      id: Date.now()
    };
    itemsRef.push(newItem);
  }
}

class TodoList extends React.Component {
  constructor() {
    super();
    this.onClickfn = this.onClickfn.bind(this);
  }

  onClickfn(id, key){
    this.props.delete(id, key);
  }
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li onClick={() => this.onClickfn(item.id, item.key)} key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

export default Home;
