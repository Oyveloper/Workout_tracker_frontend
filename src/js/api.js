import $ from "jquery";
import auth from "./auth";

class Api {
    constructor() {
        this.baseURL = "/api";
    }
    getWorkoutList(cb, fail) {
        const workoutURL = this.baseURL + "/workoutList";

        $.ajax({
            type: "GET",
            url: workoutURL,
            beforeSend: function (xhr) {
		xhr.setRequestHeader("Authorization", auth.getJwt());
	        
	    },
            headers: {
                "Authorization": auth.getJwt()
            }

        }).fail((e) => {
            fail(e);
        }).done((response) => {
            cb(response);
        });
        
    }
}
const api = new Api();
export default api;
