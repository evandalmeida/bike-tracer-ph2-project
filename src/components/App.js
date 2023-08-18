import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WorkoutDetails from './WorkoutDetails';
import RecordWorkout from './RecordWorkout';
import { useState, useEffect } from 'react';
import WorkoutList from './WorkoutList';
import Navbar from './Navbar';
import Search from './Search';

export default function App() {
  const [workouts, setWorkouts] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/workouts')
      .then(response => response.json())
      .then(data => setWorkouts(data));
      
    // Fetch the current location using Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setCurrentLocation([position.coords.latitude, position.coords.longitude]);
      });
    }
  }, []);

  return (
    <div id="root" className='slider-thumb'>
      <Router>
        <h1 className="header">WELCOME TO MOTOMAN</h1>
        <Navbar />
        <Routes>
          <Route 
            path="/newworkout" 
            element={<RecordWorkout addWorkout={(workout) => setWorkouts([...workouts, workout])} workouts={workouts} currentLocation={currentLocation}/>} 
          />
          <Route 
            path="/workouts/:id" 
            element={<WorkoutDetails/>} 
          />
          <Route 
            path="/allworkouts" 
            element={<WorkoutList workouts={workouts}/>} 
          />
          <Route 
            path="/search" 
            element={<Search/>} 
          />
        </Routes>
      </Router>
    </div>
  );
}
