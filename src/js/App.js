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


import $ from 'jquery';

import '../css/App.css';

function App() {
    return (
	<div id="App">
	    <Router>
		<Switch>
		    
		    <Route path="/login">
			<Login />
		    </Route>

		    <Route path ="/signup">
			<Signup />
		    </Route>
		    <Route path="/dashboard">
			<Menu current="dashboard"/>
			<Dashboard />
		    </Route>
		    <Route path="/about">
			<Menu current="about" />
			<div>About us</div>
		    </Route>
		    <Route path="/">
			<Redirect to='/dashboard'/>
		    </Route>
		    
		    
		</Switch>

	    </Router>


	</div>

    );
}

export default App;
