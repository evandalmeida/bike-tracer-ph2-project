import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import WorkoutList from './WorkoutList';
import WorkoutDetails from './WorkoutDetails';
import RecordWorkout from './RecordWorkout';
import WeeklyCalendar from './WeeklyCalendar';
import Search from './Search';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    const [workouts, setWorkouts] = useState([]);
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ lat: latitude, lng: longitude });
            });
        }
    }, []);

    useEffect(() => {
        fetch('http://localhost:3000/workouts')
            .then(response => response.json())
            .then(workouts => setWorkouts(workouts))
    }, []);
    
    const addWorkout = (newWorkout) => {
        setWorkouts(prevWorkouts => [...prevWorkouts, newWorkout]);
    };

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={
                    <>
                        <RecordWorkout addWorkout={addWorkout} currentLocation={currentLocation} />            
                         <br/>
                         <WeeklyCalendar workouts={workouts} currentLocation={currentLocation} />
                    </>} 
                />
                <Route path="/all-workouts" element={<WorkoutList workouts={workouts} />} />
                <Route path="/workout/:id" element={<WorkoutDetails />} />
                <Route path="/weekly" element={<WeeklyCalendar workouts={workouts} />} />
                <Route path="/search" element={<Search workouts={workouts} />} />
            </Routes>
        </Router>
    );
}

export default App;
