import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();

    return (
        <nav id="navbar">
            {location.pathname !== "/" && <Link id="Home" to="/">Home</Link>}
            <br/>
            <Link id="All Workouts" to="/allworkouts">All Rides</Link>
            <br/>
            <Link id="New Workout" to="/newworkout">Add a Ride</Link>
            <br/>
            <Link id="Search" to="/search">Search</Link>
        </nav>
    );
}
