import React from 'react';
import { Link } from 'react-router-dom';

function WorkoutList({ workouts }) {
    if (workouts.length === 0) {
        return <p>No workouts available.</p>;
    }

    return (
        <div className="workout-list">
            <h2>All Workouts</h2>
            <ul>
                {workouts.map(workout => (
                    <li key={workout.id}>
                        <Link to={`/workout/${workout.id}`}>
                            {workout.date} - Started at: {workout.timeStarted}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default WorkoutList;
