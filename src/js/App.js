import React from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import Login from './Login.js';
import Signup from './Signup.js';
import Dashboard from './Dashboard.js';

import $ from 'jquery';

import '../css/App.css';

function App() {
  return (
      <Router>

	  <Switch>
	      
              <Route path="/login">
		  <Login />
              </Route>

	      <Route path ="/signup">
		  <Signup />
	      </Route>
	      <Route path="/dashboard">
		  <Dashboard />
	      </Route>
	      <Route path="/">
		  <Redirect to='/dashboard'/>
	      </Route>
	      
	  </Switch>

      </Router>


  );
}

export default App;
