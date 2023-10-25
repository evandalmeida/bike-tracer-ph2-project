import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();

    return (
        <nav id="navbar">
            {location.pathname !== "/" && <Link id="Home" to="/">Home</Link>}
            <br/>
            {location.pathname !== "/allworkouts" && <Link id="All Workouts" to="/allworkouts">All Rides</Link>}
            <br/>
            {location.pathname !== "/newworkout" && <Link id="New Workout" to="/newworkout">Add a Ride</Link>}
            <br/>
            {location.pathname !== "/search" && <Link id="Search" to="/search">Search</Link>}
        </nav>
    );
}
