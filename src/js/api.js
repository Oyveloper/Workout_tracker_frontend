import $ from "jquery";
import auth from "./auth";

class Api {
    constructor() {
        this.baseURL = process.env.NODE_ENV == "production"
            ? "/api"
            : "http://localhost:8080";
    }
    getWorkoutList(cb, fail) {
        const workoutURL = `${this.baseURL}/workoutList`;

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

    /**
     * Uploads the given workout object
     * @param {Object} workoutData - Parameter description.
     * @param {string} workoutData.name - the workout name
     * @param {string} workoutData.date - the date
     * @param {string} workoutData.progression
     * @param {boolean} workoutData.moreIsGoodSorting
     * @param {number} workoutData.ammount
     */
    uploadNewWorkout(workoutData, success) {
        $.ajax({
            type: "POST",
            url: `${this.baseURL}/addWorkoutEntry`,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", auth.getJwt());

            },
            headers: {
                "Authorization": auth.getJwt()
            },
            data: workoutData
        }).fail((e) => {
            console.log(e);
        }).done((response) => {
            // Success!
            console.log("Successflully added a new workout");
            success();
        });
    }
}
const api = new Api();
export default api;
