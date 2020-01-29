import React from "react";
import './Login.css';
import $ from 'jquery';

import {getJwt, setJwt} from "./utils.js"; 

export default function Signup() {
    return (
	<div className="Userform" id="Signup">
	    <div className="form-container">

		<h1>Signup</h1>
		
		<form action="#" onSubmit={signupSubmit} id="signupform">
		    <label for="email">Email adress</label>
		    <input type="text" name="email" id="email" placeholder="Please enter your email" />

		    <label for="name">Name</label>
		    <input type="text" name="name" id="name" placeholder="Please enter your name"></input>

		    <label for="password">Password</label>
		    <input type="password" name="password" id="password" placeholder="Enter your new password" />

		    <input type="submit" value="Sign up" className="submit-btn" />
		</form>
	    </div>
	</div>
    );
}


function signupSubmit(e) {

    e.preventDefault();

    var email = document.getElementById("email").value;
    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;

    var data = {
	"email": email,
	"name": name,
	"password": password
    };

    
    var signupURL = "http://localhost:8080/auth/signup"


    
    $.ajax({
	type: "POST",
	url: signupURL,
	data: data,
    }).fail((e) => {
	console.log("Error", e);
    }).done((response) => {
	var jwt = response["jwt"];

	setJwt(jwt);

	window.location.href = "/workouts";
    });
    
}

