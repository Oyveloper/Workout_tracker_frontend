import React from 'react';
import '../css/Menu.css';
import {setJwt} from './utils.js';

export default function Menu(props) {
    const current = props.current;

    const links = [
        <li className={current === 'dashboard' ? 'current' : ''} key="dash"><a href="/dashboard">Dashboard</a></li>,
	<li className={current === 'about' ? 'current' : ''} key="about"><a href="/about">About us</a></li>,
        <li key="logut"><a href="#" onClick={logut}>Logout</a></li>
    ];
    
    return (
	<div className="Menu">
	    <ul>
	      {links}
	    </ul>


	</div>
    );

    
}


function logut(e) {
    setJwt("");
}
