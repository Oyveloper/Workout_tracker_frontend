import React, {useState} from "react";
import '../css/Login.css';
import $ from 'jquery';
import {getJwt, setJwt} from "./utils.js";

import {Redirect} from "react-router-dom";

import auth from "./auth";


export default function Login() {
    const [hasError, setHasError] = useState(false);
    const [loginSuccess, setLoginSucces] = useState(false);
    function loginSubmit(e) {

        e.preventDefault();

        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;


        var loginURL = "http://localhost:8080/auth/login";

        auth.login(email, password, () => {
            // successful login
            setLoginSucces(true);
        }, () => {
            // error on login
            // should display an error message
            setHasError(true);

        });
    }

    if (loginSuccess) {
        return <Redirect to="/dashboard"/>;
    }
    const errorMessage = hasError
          ? <h2 className="ErrorMessage">Error! Wrong email or password</h2>
          : null;
    
    return (
	<div className="Userform" id="Signup">
	    <div className="form-container">

	      <h1>Login</h1>
	      {errorMessage}
	      <form action="#" onSubmit={loginSubmit} id="signupform">
		<label htmlFor="email">Email adress</label>
		<input type="text" name="email" id="email" placeholder="Enter your email" />

		<label htmlFor="password">Password</label>
		<input type="password" name="password" id="password" placeholder="Enter your password" />

		<input type="submit" value="Login" className="submit-btn" />
	      </form>
	    </div>
	</div>
    );
}

