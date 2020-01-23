import React from "react";
import '../css/Login.css';
import $ from 'jquery';
import {getJwt, setJwt} from "./utils.js";


export default function Login() {
    return (
	<div className="Userform" id="Signup">
	    <div className="form-container">

		<h1>Login</h1>
		
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


function loginSubmit(e) {

    e.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var data = {
	"email": email,
	"password": password
    };

    
    var signupURL = "http://localhost:8080/auth/login";


    
    $.ajax({
	type: "POST",
	url: signupURL,
	data: data,
    }).fail((e) => {
	console.log(e);
    }).done((response) => {

	var jwt = response["jwt"];

	setJwt(jwt);

	window.location.href = "/dashboard";
    });
    
}
