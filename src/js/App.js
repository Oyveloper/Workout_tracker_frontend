import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Dashboard from './pages/Dashboard.js';
import ProtectedRoute from "./pages/ProtectedRoute";
import Custom404 from "./pages/Custom404";


import '../css/App.css';

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
            <Dashboard/>
          </ProtectedRoute>

          <Route exact path="/">
            <Redirect to='/dashboard'/>
          </Route>

          <Route exact path="*" component={Custom404}/>
        </Switch>

      </Router>


    </div>

  );
}

export default App;
