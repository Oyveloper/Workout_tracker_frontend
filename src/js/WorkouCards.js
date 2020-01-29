import React from "react";
import "../css/WorkoutCard.css";

import Chart from "chart.js";

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


function lineChartForWorkout(workout, targetID) {
    var ctx = document.getElementById(targetID).getContext("2d");
    var labels = []; 
    var data = [];

    var counter = 0; 
    workout.entries.forEach((entry) => {
	data.push(entry.ammount);
	labels.push(counter);
	counter += 1;

    });

    var options = {
	legend: {
	    display: false
	},
	scales: {
            xAxes: [{
		gridLines: {
                    display:false
		}
            }],
            yAxes: [{
		gridLines: {
                    display:false
		}   
            }]
	}
    }

    var chart = new Chart(ctx, {
	type: 'line',
	data: {
	    labels: labels,
	    datasets: [{
		label: "Reps",
		data: data,
		fill: false,
		backgroundColor: "#0099ff",
		borderColor: "#0099ff",
		
	    }]
	},
	options: options,

    });
}


export function WorkoutDetailCard(props) {
    const workoutData = props.workoutData;

    const workoutGraph = (
	<div className="workout-graph-container">
	    <canvas id="workout-graph" height="70px"></canvas>
	</div>
    );



    setTimeout(() => {
	lineChartForWorkout(workoutData, "workout-graph");
    }, 200)
    
    return (
	<div className="WorkoutDetailCard">
	    <h1>{workoutData.name}</h1>
	    <div className="max-container">
		{workoutGraph}
		<div className="max-title-detail">Personal Max: {workoutData.maxRep}</div>

	    </div>
	</div>
    );
}

