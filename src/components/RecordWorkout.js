import React, { useState } from 'react';
import WorkoutMap from './WorkoutMap';

const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
};

function RecordWorkout({ addWorkout, currentLocation }) {
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [timeStarted, setTimeStarted] = useState('');
    const [coordinates, setCoordinates] = useState([]);
    let watcher = null;

    const startRecording = () => {
        if (!isPaused) {
            setTimeStarted(new Date().toLocaleTimeString());
        }
        setIsRecording(true);
        setIsPaused(false);

        const options = {
            maximumAge: 0, 
            timeout: 5000
        };

        if (navigator.geolocation) {
            watcher = navigator.geolocation.watchPosition(throttle(position => {
                setCoordinates(prevCoords => [...prevCoords, {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    timestamp: new Date(position.timestamp).toLocaleTimeString()
                }]);
            }, 1000), (error) => {
                console.error("Error obtaining position: ", error);
            }, options);
        }
    };

    const pauseRecording = () => {
        setIsPaused(true);
        if (watcher !== null) {
            navigator.geolocation.clearWatch(watcher);
        }
    };

    const stopRecording = () => {
        setIsRecording(false);
        setIsPaused(false);
        if (watcher !== null) {
            navigator.geolocation.clearWatch(watcher);
        }
    };

    const handleSave = () => {
        const newWorkout = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            timeStarted,
            coordinates
        };
    
        // Persist to Netlify function
        fetch('https://motoman.netlify.app/.netlify/functions/create', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newWorkout),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            addWorkout(data);
            setTimeStarted('');
            setCoordinates([]);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error.message);
        });
    };
    

    return (
        < >
            <WorkoutMap workouts={[{ coordinates }]} currentLocation={currentLocation} />

            {!isRecording && !isPaused ? (
                <button onClick={startRecording}>Start Recording</button>
                ) : null}
            {isRecording && !isPaused ? (
                <button onClick={pauseRecording}>Pause Recording</button>
                ) : null}
            {isPaused ? (
                <button onClick={startRecording}>Continue Recording</button>
                ) : null}
            {isRecording || isPaused ? (
                <button onClick={stopRecording}>Stop Recording</button>
                ) : null}
            {!isRecording && !isPaused && timeStarted ? (
                <button onClick={handleSave}>Save Workout</button>
                ) : null}
        </>

    );
}

export default RecordWorkout;
