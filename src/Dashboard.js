import React, {useState} from "react";
import $ from 'jquery';

import {getJwt, setJwt} from "./utils.js";

export default function Dashboard() {

    const [title, setTitle] = useState("")


    $.ajax({
	type: "GET",
	url: "http://localhost:8080/workoutlist",
	beforeSend: function (xhr) {
	    xhr.setRequestHeader("Authorization", getJwt());
	    xhr.setRequestHeader("boop", "helo");
	},
	headers: {
	    "Authorization": getJwt()
	}

    }).done((response) => {
	setTitle(response)
    }).fail((response) => {
	console.log("failing");
	window.location.href = "/login"
    });


    return (
	<div>
	    <h1>{title}</h1>

	</div>
	
    )
    

}
