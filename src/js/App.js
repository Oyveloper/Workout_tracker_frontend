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
import Menu from './Menu.js';
import ProtectedRoute from "./ProtectedRoute";

import auth from "./auth";


import $ from 'jquery';

import '../css/App.css';


const DashBoardWrapper = () => (
    <div>
      <Menu current="dashboard"/>
      <Dashboard/>      
    </div>
);

function App() {
    
    return (
	<div id="App">
	    <Router>
		<Switch>
		    
		  <Route exact path="/login">
		    <Login />
		  </Route>
		  <Route exact path ="/signup">
		    <Signup />
		  </Route>
	          <ProtectedRoute exact path="/dashboard">
                    <Menu current="dashboard"/>
                    <Dashboard/>
                  </ProtectedRoute>
		  <Route exact path="/about">
		    <Menu current="about" />
		    <div>About us</div>
		  </Route>
		  <Route exact path="/">
		    <Redirect to='/dashboard'/>
		  </Route>
		    
		</Switch>

	    </Router>


	</div>

    );
}

export default App;
