import React from "react";
import app from "./firebase";
import firebase from "./firebase";
import 'firebase/database';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '', isSignedIn : false, hashItems: [], percentBooked: 0, noteSent: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

loadDB() {
  const itemsRef = app.database().ref('text');
  let noteCheck = this.state.noteSent;
  itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
    let newState = [];
    let hashTags = [];
    let newHash = [];
    let uniqueHash = [];
    let datesBooked = [];
    if(firebase.auth().currentUser) {
      for (let item in items) {
        if(items[item].uid===firebase.auth().currentUser.uid) {
          var regexp = /\B\#\w\w+\b/g;
          let hashCheck = items[item].text.match(regexp);
          if (hashCheck !== null) {
            for(let tag in hashCheck) {
              hashTags.push(hashCheck[tag]);
            }
          }
          if(items[item].endDate==null) {
            items[item].endDate = items[item].startDate;
          }
          let startDCount = Math.floor((items[item].startDate - Date.now()) / (1000*60*60*24));
          let endDCount = Math.floor((items[item].endDate - Date.now()) / (1000*60*60*24));
          if (endDCount==0 && noteCheck==false) {
            noteCheck=true;
          }
          for(let i = 1; i < 31; i++) {
            if(i >= startDCount && i <= endDCount) {
              datesBooked.push(i);
            }
          }
          newState.push({
            id: items[item].id,
            text: items[item].text,
            creator: items[item].creator,
            key: item,
          });
        }
      }
      for (let item in items) {
        if(items[item].uid!==firebase.auth().currentUser.uid) {
          for(let tag in hashTags) {
            if(items[item].text.indexOf(hashTags[tag])!==-1) {
              newHash.push(items[item]);
            }
          }
        }
      }
    }
    uniqueHash = [...new Set(newHash)];
    datesBooked = [...new Set(datesBooked)];
    this.setState({
      items: newState,
      hashItems: uniqueHash,
      percentBooked: (Math.floor(datesBooked.length / 30 * 100)),
      noteSent: noteCheck
    });
  });
}

  componentDidMount = () => {

    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user})
      console.log("user", user)
    })
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else {
      Notification.requestPermission();
    }
    this.loadDB();
  }

  componentDidUpdate(prevProps,prevState) {
    if (this.state.isSignedIn !== prevState.isSignedIn) {
      this.loadDB();
      if(this.state.noteSent) {
        this.showNotification();
      }
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
    const piestyle = {
        width: "75px",
        height: "75px",
//        borderRadius: "50%",
        background: "red",
        backgroundImage:"linear-gradient(to right, transparent " + this.state.percentBooked + "%, green 0)"
      }
    var notif_sound = "notif_sound";

    return (
      this.state.isSignedIn
      ?<div>
      <audio className="notifSound">
        <source src='/pen.mp3' type='audio/mpeg' />
      </audio>
        <h3>Kabooked Items</h3>
        <TodoList items={this.state.items} delete={this.delete.bind(this)} />
        <HashList items={this.state.hashItems} />
        <h3>Please Enter an Item to Kabook</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            Item Name:&nbsp;&nbsp;
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
        <br></br>
        (For Group Collaboration Place Shared #Hashtags Anywhere in Item Name)
        <h3>Next 30 Days</h3>
        <div style={piestyle}></div>
        <h3>{this.state.percentBooked} % Kabooked</h3>
      </div>
      :
        <div></div>


    );
  }

  showNotification() {
      var justdate = new Date();
      justdate.setHours(0,0,0,0);
      var options = {
        body: "You have Kabooked items ending soon!",
        tag:justdate
      };
     const audioNote = document.getElementsByClassName("notifSound")[0]
     let notification = new Notification("Kabooked Notification", options);
     notification.onshow = function() { audioNote.play(); };
//     notification.addEventListener("click", function() {
     //document.addEventListener("visibilitychange", function() {
//         audioNote.play();
//       });
//     }, false);
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
      creator: firebase.auth().currentUser.displayName,
      groupColor: "blue",
      startDate: Date.now(),
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
          <li onClick={() => {if(window.confirm('Would you like to delete this item?')){this.onClickfn(item.id, item.key)};}} key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

class HashList extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      (this.props.items!="")
      ?<ul>
        <h3>Other Tasks with Your Hashtags</h3>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text} by {item.creator}</li>
        ))}
      </ul> : <ul></ul>
    );
  }
}

export default Home;
