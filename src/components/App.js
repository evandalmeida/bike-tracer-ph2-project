import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

// COMPONENTS
import WorkoutDetails from './WorkoutDetails';
import RecordWorkout from './RecordWorkout';
import WorkoutList from './WorkoutList';
import WeeklyCalendar from './WeeklyCalendar';
import Navbar from './Navbar';
import Search from './Search';
import Footer from './Footer';

export default function App() {
  const [workouts, setWorkouts] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/workouts')
      .then(response => response.json())
      .then(data => setWorkouts(data));
      
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setCurrentLocation([position.coords.latitude, position.coords.longitude]);
      });
    };
  }, []);

  return (
      <>
      <Router>
        <h1 className="header">BIKE TRACER</h1>
        <Navbar />
        <br/>
        <div className='maindiv'>


          <Routes>
            <Route
              index='true'
              path='/'
              element={ <WeeklyCalendar workouts={workouts}/> }
            />
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
        <Footer/>
        </div>

      </Router>
    </>
  );
};