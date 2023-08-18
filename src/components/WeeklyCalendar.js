import React from 'react';
import { Link } from 'react-router-dom';

function WeeklyCalendar({ workouts = [] }) {
    
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const lastWeekWorkouts = workouts.filter(workout => new Date(workout.date) >= oneWeekAgo);

    return (
        <div className="weekly-calendar">
            <h2>Last Week's Workouts</h2>
            <ul>
                {lastWeekWorkouts.map((workout, index) => (
                    <li key={index} className="no-bullets"> 
                        <Link to={`/workouts/${workout.id}`}> <span>{new Date(workout.date).toLocaleDateString()}</span></Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default WeeklyCalendar;
