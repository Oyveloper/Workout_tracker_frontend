import React from "react";
import "../css/WorkoutCard.css";
import $ from 'jquery';

import auth from "./auth";

import Chart from "chart.js";

export function WorkoutOverviewCard(props) {
    const name = props.name;
    const maxCount = props.maxCount;

    return(
	<div className="WorkoutOverviewCard" name={name}>
	    <h2>{name}</h2>
	    <div className="max-container">
		<p className="max-title">Personal best</p>
		<p className="max">{maxCount}</p>
	    </div>
	    
	</div>
    );
    
    
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
    };

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
    }, 200);
    
    return (
	<div className="WorkoutDetailCard popup-card">
	    <h1>{workoutData.name}</h1>
	    <div className="max-container">
		{workoutGraph}
		<div className="max-title-detail">Personal best: {workoutData.maxRep}</div>

	    </div>
	</div>
    );
}

export function NewWorkoutCard(props) {

    // Funciton passed for how to handle dismissal of this card
    const dismissCard = props.dismissCard; 



    
    // measurement: moreIsGood
    var measurements = {
        "reps": true,
        "s": false,
        "min": false,
        "hours": false,
        "m": true,
        "km": true,
        "kg": true,
        "km/h": true,
        "m/s": true,
        "min/km": false
    };


    
    // Handle the submission of a new workout 
    function newWorkoutSubmit(e) {
        e.preventDefault();

        const wname = document.getElementById("wname").value;
        const measure = document.getElementById("measure").value;
        const number = document.getElementById("number").value;
        const moreIsGood = measurements[measure];
        
        const now = new Date();
        var day = now.getDate();
        var month = now.getMonth() + 1;
        const year = now.getFullYear();

        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }

        console.log(day + month + year);
        
        const data = {
            name: wname,
            date: "" + day + month + year,
            progression: "noe",
            moreIsGoodSorting: moreIsGood,
            ammount: number
        };

        $.ajax({
            type: "POST",
            url: "api/addWorkoutEntry",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", auth.getJwt());

            },
            headers: {
                "Authorization": auth.getJwt()
            },
            data: data
        }).fail((e) => {
            console.log(e);
        }).done((response) => {
            // Success!
            console.log("Successflully added a new workout");
            dismissCard();
            
        });
    }

    var measurementOptions = Object.keys(measurements).map(s => <option key={s} value={s}>{s}</option>);
    
    return (
        <div className="NewWorkoutCard popup-card">
        <h1>New Workout</h1>
          <form action="" id="newWorkoutHtmlForm" onSubmit={newWorkoutSubmit}>
            <label htmlFor="wname">Workout Name</label><br/>
            <input name="wname" id="wname" type="text"  placeholder="Enter workout name"/>

            <label htmlFor="measure">Measurement</label><br/>
            <select id="measure" name="measure">
              {measurementOptions}
            </select>

            <label htmlFor="number">Ammount</label><br/>
            <input name="number" id="number" type="number" step="0.01"/>

            <input name="Submit" type="submit" value="Add Workout"/>
          </form>
        </div>
    );
}
