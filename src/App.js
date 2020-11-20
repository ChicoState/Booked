import React from 'react';
import Home from "./Home";
import CalApp from "./calApp";

//import './main.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {
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
          <li>
            <Link to="/signin">Sign in</Link>
          </li>
          </ul>
        <hr />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/calender">
            <CalApp />
          </Route>
        </Switch>

      </div>
    </Router>
  );
};

export default App;//app lower in firebase
