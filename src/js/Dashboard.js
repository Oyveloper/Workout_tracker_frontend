import React, {useState} from "react";
import $ from 'jquery';

import {getJwt} from "./utils.js";
import {WorkoutOverviewCard, WorkoutDetailCard} from "./WorkouCards.js";

import "../css/Dashboard.css";

export default function Dashboard() {

    const [workouts, setWorkouts] = useState([]);
    const [hasData, setHasData] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [detailWorkout, setDetailWorkout] = useState({}); 

    // A little bit ugly to have this funciton inside a function but who cares...
    function handleClick(e) {
	const el = e.target;

	if (el.className === "popup") {
	    setShowDetail(false);
	    return;
	}


	var workoutName = ""; 
	if (el.className !== "WorkoutOverviewCard") {
	    var matchingParents = $(el).parents(".WorkoutOverviewCard");
	    if (matchingParents.length > 0) {

		workoutName = matchingParents[0].getAttribute("name"); 
	    } else {
		return;
	    }
	} else {
	    workoutName = el.getAttribute("name"); 
	}
	var workoutData; 
	workouts.forEach((workout) => {
	    if (workout.name === workoutName) {
		workoutData = workout;
		return;
	    }
	});

	if (!(workoutData === null)) {
	    setDetailWorkout(workoutData); 
	    setShowDetail(true);
	}

    }

    
    document.addEventListener("click", handleClick);

    if (!hasData) {
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

	    setWorkouts(response);

	    setHasData(true);

	}).fail((response) => {
	    console.log("failing");
	    window.location.href = "/login"
	});

    }
    var workoutItems = [];


    for (var i = 0; i < workouts.length; i++) {
	workoutItems.push(<WorkoutOverviewCard name={workouts[i].name} key={workouts[i].name} maxCount={workouts[i].maxRep} />);
    }

    const detail = showDetail
		 ? <div className="popup"><WorkoutDetailCard workoutData={detailWorkout} /></div>
		 : null;

    return (
	<div className="Dashboard">
	    <h1>Dashboard</h1>

	    <ul>
		{workoutItems}
	    </ul>
	    {detail}
	</div>
	
    );
    

}

