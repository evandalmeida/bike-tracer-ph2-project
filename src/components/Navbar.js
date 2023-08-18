import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();

    return (
        <nav id="navbar">
            {location.pathname !== "/" && <Link id="Home" to="/">Home</Link>}
            <br/>
            <Link id="All Workouts" to="/allworkouts">All Workouts</Link>
            <br/>
            <Link id="New Workout" to="/newworkout">Add Your Next Workout</Link>
            <br/>
            <Link id="Search" to="/search">Search</Link>
        </nav>
    );
}
