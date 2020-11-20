import React from "react";
import app from "./firebase";
import 'firebase/database';
//import main.css

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const itemsRef = app.database().ref('text');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: items[item].id,
          text: items[item].text,
        });
      }
      this.setState({
        items: newState
      });
    });
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
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
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
      id: Date.now()
    };
    itemsRef.push(newItem);
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

export default Home;
