import React from 'react';
import * as firebase from 'firebase';
import CalApp from './calApp';
import './main.css';
import './firebase.js';
//start router code////////
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/calender">Calender</Link>
          </li>
        </ul>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <TodoApp />
          </Route>
          <Route path="/calender">
            <CalApp />
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

//test to see if we can put before initial databse
// function Home() {
//   return (
//     <div>
//       <h2>Home test</h2>
//     </div>
//   );
// }

// function Calender() {
//   return (
//     <div>
//       <h2>Calender test</h2>
//     </div>
//   );
// }
///////////end router test//////////////////
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref('text');
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
    const itemsRef = firebase.database().ref('text');
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    itemsRef.push(newItem);
//    this.setState(state => ({
//      items: state.items.concat(newItem),
//      text: ''
//    }));
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
