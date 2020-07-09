import React from 'react';

import auth from '../auth.js';

import '../../css/navbar.css';


const logoutHandler = () => {
    auth.logout(() => {
        window.location.reload();
    });
}

export default function Navbar() {
    return (
        <div id="Navbar">
          <button id="logout-btn" onClick={logoutHandler}>Logout</button>
        </div>
    );
}
