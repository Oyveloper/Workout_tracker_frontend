import React, {useState} from "react";
import $ from 'jquery';

import {getJwt} from "./utils.js";
import {WorkoutOverviewCard, WorkoutDetailCard, NewWorkoutCard} from "./WorkouCards.js";
import AddBtn from './AddBtn.js';

import "../css/Dashboard.css";

export default function Dashboard() {

    const [workouts, setWorkouts] = useState([]);
    const [hasData, setHasData] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [detailWorkout, setDetailWorkout] = useState({});
    const [showNewWorkout, setShowNewWorkout] = useState(false);

    // A little bit ugly to have this funciton inside a function but who cares...
    function handleClick(e) {
	const el = e.target;

	if (el.className === "popup") {
	    setShowDetail(false);
            setShowNewWorkout(false);
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

	if (!(workoutData == null)) {
	    setDetailWorkout(workoutData); 
	    setShowDetail(true);
	}

    }

    
    function addNewPopup() {
        setShowNewWorkout(true);
        
    }

    function removeNewWorkoutPopup() {
        setShowNewWorkout(false);

        setHasData(false); 
    }


    
    document.addEventListener("click", handleClick);

    if (!hasData) {
	$.ajax({
	    type: "GET",
	    url: "http://localhost:8080/workoutlist",
	    beforeSend: function (xhr) {
		xhr.setRequestHeader("Authorization", getJwt());
	
	    },
	    headers: {
		"Authorization": getJwt()
	    }

	}).done((response) => {

	    setWorkouts(response);

	    setHasData(true);

	}).fail((response) => {
	    console.log("failing");
	    window.location.href = "/login";
	});

    }
    var workoutItems = [];


    for (var i = 0; i < workouts.length; i++) {
	workoutItems.push(<WorkoutOverviewCard name={workouts[i].name} key={workouts[i].name} maxCount={workouts[i].maxRep} />);
    }

    const detail = showDetail
	  ? <div className="popup"><WorkoutDetailCard workoutData={detailWorkout} /></div>
	  : null;
    const newWorkout = showNewWorkout
          ? <div className="popup"><NewWorkoutCard dismissCard={removeNewWorkoutPopup}/></div>
          : null;

    const addBtn = !showNewWorkout
          ? <AddBtn description="Add new workout" action={addNewPopup}/>
          : null;

    const noDataMessage = (workouts.length === 0 && hasData)
          ? <h2>No workouts yet... Try adding one!</h2>
          : null;




    return (
        <div className="Dashboard">
	  <h1>Dashboard</h1>
          {noDataMessage}
	    <ul>
		{workoutItems}
	    </ul>
	  {detail}
          {newWorkout}

          {addBtn}
	</div>
	
    );
    

}


