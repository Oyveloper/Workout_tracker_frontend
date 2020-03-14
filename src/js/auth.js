import $ from 'jquery';

import {getJwt, setJwt} from "./utils.js";

class Auth {
    login(email, password, cb, fail) {

        const loginURL = "http://localhost:8080/auth/login";

        var data = {
	    "email": email,
	    "password": password
        };
        
        $.ajax({
	    type: "POST",
	    url: loginURL,
	    data: data,
        }).fail((e) => {
            fail();
        }).done((response) => {

	    var jwt = response["jwt"];
	    setJwt(jwt);

            cb();
        });
    }

    logout(cb) {
        setJwt("");
        cb();
    }

    checkAuthentication(cb) {
        const jwt = getJwt();

        if (jwt != "" ||  jwt != null) {

            $.ajax({
                type: "GET",
                url: "http://localhost:8080/auth/isAuthenticated",
                beforeSend: function (xhr) {
		    xhr.setRequestHeader("Authorization", getJwt());
	            
	        },
	        headers: {
		    "Authorization": getJwt()
	        }


            }).fail((e) => {
                cb(false);
            }).done((response) => {
                cb(response);
            });
        } else {
            cb(false);
        }
        
    }

}

const  auth = new Auth();
export default auth;
