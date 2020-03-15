import $ from 'jquery';

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
	    this.setJwt(jwt);

            cb();
        });
    }

    logout(cb) {
        this.setJwt("");
        cb();
    }

    checkAuthentication(cb) {
        const jwt = this.getJwt();

        if (jwt != "" ||  jwt != null) {

            $.ajax({
                type: "GET",
                url: "http://localhost:8080/auth/isAuthenticated",

	        headers: {
		    "Authorization": jwt
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

    getJwt() {
        var cookie = document.cookie;

        var jwtIndex = cookie.indexOf("jwt");
        if (jwtIndex === -1) {
	    return "";
        } else {
	    var jwtEndRaw = cookie.substring(jwtIndex).indexOf(";");
	    var jwt = "";
	    if (jwtEndRaw === -1) {
	        jwt = cookie.substring(jwtIndex + 4);
	    }
	    else {
	        jwt = cookie.substring(jwtIndex + 4, jwtEndRaw + jwtIndex);
	    }
	    return jwt;
        }
    }
    setJwt(jwt) {
        var cookie = document.cookie;

        var jwtIndex = cookie.indexOf("jwt");
        if (jwtIndex === -1) {
	    document.cookie = "jwt=" + jwt + cookie; 
        } else {
	    var jwtStart = jwtIndex + 4;
	    var jwtEndRaw = cookie.substring(jwtIndex).indexOf(";");

	    if (jwtEndRaw === -1) {
	        document.cookie = cookie.substring(0, jwtStart) + jwt; 
	    } else {
	        document.cookie = cookie.substring(0, jwtStart) + jwt + cookie.substring(jwtEndRaw);
	    }


        }
    }

}

const  auth = new Auth();
export default auth;
