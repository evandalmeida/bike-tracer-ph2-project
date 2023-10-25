import React, { useState } from 'react';

// COMPONENTS
import WeeklyCalendar from './WeeklyCalendar';
import WorkoutMap from './WorkoutMap';

// throttle helps with refreshing current location
const throttle = (func, limit) => {
    let inThrottle;

    return function() {
        const args = arguments;
        const context = this;

        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        };
    };
};

export default function RecordWorkout({ addWorkout , currentLocation , workouts }) {

    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [timeStarted, setTimeStarted] = useState('');
    const [coordinates, setCoordinates] = useState([]);
    let watcher = null;

    const startRecording = () => {
        if (!isPaused) {setTimeStarted(new Date().toLocaleTimeString())};

        setIsRecording(true);
        setIsPaused(false);

        const options = {
            maximumAge: 0, 
            timeout: 5000
        };

        if (navigator.geolocation) {
            watcher = navigator.geolocation.watchPosition(
                throttle(position => {
                        setCoordinates(prevCoords => [...prevCoords, {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude,
                            timestamp: new Date(position.timestamp).toLocaleTimeString()
                }]);
        }, 1000), 
        error => {
            console.error("Error retrieving geolocation data:", error);
        }, 
        options
    );
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
    
        fetch('http://localhost:3000/workouts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newWorkout)})
        .then(response => response.json())
        .then(data => {
            addWorkout(data);
            setTimeStarted('');
            setCoordinates([]);
        });
    };
    
    return (
        <>
            <br/>
            <WorkoutMap workouts={[{ coordinates }]} currentLocation={currentLocation} />
            <br/>
            <div className="workout-buttons">
                {!isRecording && !isPaused ? (
                    <button className="button start-button" onClick={startRecording}>Start Recording</button>
                ) : null}
                {isRecording && !isPaused ? (
                    <button className="button pause-button" onClick={pauseRecording}>Pause Recording</button>
                ) : null}
                {isPaused ? (
                    <button className="button start-button" onClick={startRecording}>Continue Recording</button>
                ) : null}
                {isRecording || isPaused ? (
                    <button className="button stop-button" onClick={stopRecording}>Stop Recording</button>
                ) : null}
                {!isRecording && !isPaused && timeStarted ? (
                    <button className="button save-button" onClick={handleSave}>Save Workout</button>
                ) : null}
            </div>
            <br/>
       
            <br/>
        </>
    );
};