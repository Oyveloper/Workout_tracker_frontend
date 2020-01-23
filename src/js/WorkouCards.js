import React from "react";
import "../css/WorkoutCard.css";


export function WorkoutOverviewCard(props) {
    const name = props.name;
    const maxCount = props.maxCount;

    return(
	<div className="WorkoutOverviewCard" name={name}>
	    <h2>{name}</h2>
	    <div className="max-container">
		<p className="max-title">Personal max</p>
		<p className="max">{maxCount}</p>
	    </div>
	    
	</div>
    )
    
    
}


export function WorkoutDetailCard(props) {
    const workoutData = props.workoutData; 
    return (
	<div className="WorkoutDetailCard">
	    <h2>{workoutData.name}</h2>
	    <div className="max-container">
		<div className="max-title">Personal Max</div>
		<div className="max">{workoutData.maxCount}</div>
	    </div>
	</div>
    );
}

