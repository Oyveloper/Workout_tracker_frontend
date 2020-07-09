import $ from 'jquery';

class Auth {
    constructor() {
        // this.baseURL = "/api/auth";
        console.log(process.env.NODE_ENV);
        this.baseURL = process.env.NODE_ENV == "production"
            ? "/api/auth"
            : "http://localhost:8080/auth";
    }
    login(email, password, cb, fail) {

        const loginURL = this.baseURL + "/login";

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
            if (response["status"] == "success") {
                var jwt = response["data"]["jwt"];
                this.setJwt(jwt);

                cb();
            } else {
                fail();
            }

        });
    }

    signup(name, email, password, cb, fail) {
        const signupURL = this.baseURL + "/signup";
        const data = {
            "email": email,
            "name": name,
            "password": password
        };

        
        $.ajax({
            type: "POST",
            url: signupURL,
            data: data,
        }).fail((e) => {
            fail(e);
        }).done((response) => {
            console.log(typeof response); 
            if (response.status === "success") {
                var jwt = response["data"]["jwt"];

                this.login(email, password, () => {
                    cb();
                }, () => {
                    // do something on fail
                    fail("Noe gikk galt...");
                });
            } else {
                console.log(response);
                fail(response["data"]["cause"]);
            }
            
            
        });
        
    }

    logout(cb) {
        this.setJwt("");
        cb();
    }

    checkAuthentication(cb) {
        const jwt = this.getJwt();

        if (jwt != "" &&  jwt != null) {

            $.ajax({
                type: "GET",
                url: `${this.baseURL}/isAuthenticated`,

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
