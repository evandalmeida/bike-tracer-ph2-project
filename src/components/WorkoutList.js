import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function WorkoutList() {
    const [workouts, setWorkouts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/workouts')
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch workouts");
                }
                return response.json();
            })
            .then(data => setWorkouts(data))
            .catch(err => setError(err.message));
    }, []);

    const handleDelete = (workoutId) => {
        fetch(`http://localhost:3000/workouts/${workoutId}`, {
            method: 'DELETE'})
        .then(() => {setWorkouts(prevWorkouts => prevWorkouts.filter(w => w.id !== workoutId))})
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="workout-list">
            <h2>All Workouts</h2>
            <ul className="no-bullets">
                {workouts.map((workout) => (
                    <li key={workout.id}>
                        <button onClick={() => handleDelete(workout.id)}> 
                            <Link to={`/workouts/${workout.id}`}>{workout.date}</Link> 
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default WorkoutList;
