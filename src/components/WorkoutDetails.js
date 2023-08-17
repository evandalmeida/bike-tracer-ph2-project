import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import { useParams } from 'react-router-dom';

function haversine_distance(coord1, coord2) {
    const R = 6371;  // Earth radius in km
    const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
    const dLng = (coord2.lng - coord1.lng) * Math.PI / 180;
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) * 
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function total_distance(coordinates) {
    let distance = 0;
    for (let i = 1; i < coordinates.length; i++) {
        distance += haversine_distance(
            { lat: coordinates[i - 1].lat, lng: coordinates[i - 1].lng }, 
            { lat: coordinates[i].lat, lng: coordinates[i].lng }
        );
    }
    return distance * 0.621371;  // Conversion from km to miles
}

function averageSpeed(distance, duration) {
    return distance / (duration / 3600); 
}

function WorkoutDetails() {
    const [workout, setWorkout] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3000/workouts/${id}`)
            .then(response => response.json())
            .then(data => setWorkout(data))
    }, [id]);

    if (!workout) {
        return <div>Loading...</div>;
    }

    const totalDist = workout.coordinates?.length ? total_distance(workout.coordinates) : 0;
    const totalTime = workout.coordinates?.length ? workout.coordinates.length * 0.5 : 0; 
    const avgSpeed = totalDist && totalTime ? averageSpeed(totalDist, totalTime * 60) : 0; 

    return (
        <div className="workout-details">
            <h2>Workout on {workout.date}</h2>
            <p>Started at: {workout.timeStarted}</p>
            <p>Total Distance: {totalDist.toFixed(2)} miles</p>
            <p>Total Time: {totalTime} minutes</p>
            <p>Average Speed: {avgSpeed.toFixed(2)} mph</p>
            <MapContainer center={[workout.coordinates[0].lat, workout.coordinates[0].lng]} zoom={13} style={{ width: '100%', height: '400px' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Polyline positions={workout.coordinates.map(coord => [coord.lat, coord.lng])} color='blue' />
            </MapContainer>
        </div>
    );
}

export default WorkoutDetails;