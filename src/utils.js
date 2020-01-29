export function getJwt() {
    var cookie = document.cookie;

    var jwtIndex = cookie.indexOf("jwt");
    if (jwtIndex == -1) {
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

export function setJwt(jwt) {
    var cookie = document.cookie;

    var jwtIndex = cookie.indexOf("jwt");
    if (jwtIndex == -1) {
	document.cookie = "jwt=" + jwt + cookie; 
    } else {
	var jwtStart = jwtIndex + 4;
	var jwtEndRaw = cookie.substring(jwtIndex).indexOf(";");

	if (jwtEndRaw == -1) {
	    document.cookie = cookie.substring(0, jwtStart) + jwt; 
	} else {
	    document.cookie = cookie.substring(0, jwtStart) + jwt + cookie.substring(jwtEndRaw);
	}


    }
}
