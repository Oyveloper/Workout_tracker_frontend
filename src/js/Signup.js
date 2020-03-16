import React, {useState} from "react";
import '../css/Login.css';
import {Redirect} from "react-router-dom";
import auth from "./auth";


export default function Signup() {

    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function signupSubmit(e) {

        e.preventDefault();

        var email = document.getElementById("email").value;
        var name = document.getElementById("name").value;
        var password = document.getElementById("password").value;


        auth.signup(name, email, password, () => {
            // Signup successfull
            setShouldRedirect(true);
        }, (message) => {
            // Sugnup failed
            console.log(message);
            setErrorMessage(message);
        });


    
    }

    if (shouldRedirect) {
        return <Redirect to="/dashboard"/>;
    }


    const errorMessageDisplay = errorMessage.length == 0
          ? null
          : <h2 className="ErrorMessage">{errorMessage}</h2>;

    
    return (
	<div className="Userform" id="Signup">
	    <div className="form-container">

	      <h1>Signup</h1>

              {errorMessageDisplay}
	      
	      <form action="#" onSubmit={signupSubmit} id="signuphtmlForm">
		<label htmlFor="email">Email adress</label>
		<input type="text" name="email" id="email" placeholder="Please enter your email" />

		<label htmlFor="name">Name</label>
		<input type="text" name="name" id="name" placeholder="Please enter your name"></input>

		<label htmlFor="password">Password</label>
		<input type="password" name="password" id="password" placeholder="Enter your new password" />

		<input type="submit" value="Sign up" className="submit-btn" />
	      </form>
              <p>Already have a user? Log inn <a href="/login">here</a></p>
	    </div>
	</div>
    );
}


