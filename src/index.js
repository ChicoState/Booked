import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth'
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAbrPremBQusjYoKqKfTcVHwxuw-Q8ikHw",
  authDomain: "booked-8586e.firebaseapp.com",
  databaseURL: "https://booked-8586e.firebaseio.com",
  projectId: "booked-8586e",
  storageBucket: "booked-8586e.appspot.com",
  messagingSenderId: "24720035765",
  appId: "1:24720035765:web:3d57fd5c840b8100c353fc",
  measurementId: "G-20QKEY7V1D"
};
firebase.initializeApp(config);

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    const rootRef = firebase.database().ref(); //.child('react')
    const itemsRef = rootRef.child('text');
    itemsRef.on('value', snap=> {
      const newItem = {
        text: snap.val(),
        id: Date.now()
      };
      //TodoList items=this.state.items;
      // this.setState({
      //   //text: snap.val
      //   items: self.concat(newItem),
      //   text: ''
      // });
      this.setState(state => ({
        items: state.items.concat(newItem),
        text: ''
      }));
    });
  }

  render() {
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
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
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

ReactDOM.render(
  <TodoApp />,
  document.getElementById('root')
);
