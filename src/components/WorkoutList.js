import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function WorkoutList() {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        // Fetch all workouts using the getAll function on component mount
        fetch('/.netlify/functions/getAll')
            .then(response => response.json())
            .then(data => setWorkouts(data))
            .catch(error => console.error('Error fetching workouts:', error));
    }, []);

    const handleDelete = (workoutId) => {
        // Call the delete function to remove the workout
        fetch(`/.netlify/functions/delete/${workoutId}`, {
            method: 'DELETE'
        })
        .then(() => {
            // Remove the workout from local state as well
            setWorkouts(prevWorkouts => prevWorkouts.filter(w => w.id !== workoutId));
        })
        .catch(error => console.error('Error deleting workout:', error));
    };

    return (
        <div className="workout-list">
            <h2>All Workouts</h2>
            <ul>
                {workouts.map((workout) => (
                    <li key={workout.id}>
                        <Link to={`/workouts/${workout.id}`}>{workout.date}</Link> 
                        <button onClick={() => handleDelete(workout.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default WorkoutList;
