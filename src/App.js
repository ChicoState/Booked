import React from 'react';
import Home from "./Home";
import CalApp from "./calApp";
import AuthControl from "./authenticate";
//import './main.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {
  const logoStyle = {
      width: "75px",
      height: "75px",
    }
  return (
    <Router>
      <div>
      <h1>Booked <img src="logo.png" alt="Booked Logo" style={logoStyle}></img></h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/calender">Calendar</Link>
          </li>
          <li>
            {/*<Link to="/signin">Sign in</Link>*/}
            {/*<Router exact path="/authentication" component={AuthControl} />*/}
            <AuthControl />
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
