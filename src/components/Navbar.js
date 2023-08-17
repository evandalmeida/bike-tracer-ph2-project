import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar">
            <Link className="Home" to="/">Home</Link>
            <br/>
            <Link className="All Workouts" to="/all-workouts">All Workouts</Link>
            <br/>
            <Link className="Search"to="/search">Search</Link>
        </nav>
    );
}

export default Navbar;
