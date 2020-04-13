import React, {useState} from 'react';
import '../css/Menu.css';
import auth from "./auth";
import {Redirect} from "react-router-dom";

export default function Menu(props) {
    const current = props.current;
    const [loggedOut, setLoggedOut] = useState(false);
    const links = [
        <li className={current === 'dashboard' ? 'current' : ''} key="dash"><a href="/dashboard">Dashboard</a></li>,
	<li className={current === 'about' ? 'current' : ''} key="about"><a href="/about">About us</a></li>,
        <li key="logut"><button onClick={logut}>Logout</button></li>
    ];

    
    function logut(e) {
        auth.logout(() => {
            setLoggedOut(true);
        });
    }

    if (loggedOut) {
        return <Redirect to="/login"/>;
    }
    
    return (
	<div className="Menu">
	    <ul>
	      {links}
	    </ul>


	</div>
    );

    
}


