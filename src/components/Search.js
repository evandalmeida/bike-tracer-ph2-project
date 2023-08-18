import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function Search() {
    const [searchDate, setSearchDate] = useState(new Date());
    const [workouts, setWorkouts] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        // Fetch all workouts using the getAll function on component mount
        fetch('/.netlify/functions/getAll')
            .then(response => response.json())
            .then(data => setWorkouts(data))
            .catch(error => console.error('Error fetching workouts:', error));
    }, []);

    const handleSearch = () => {
        const selectedDate = searchDate.toLocaleDateString();
        const filtered = workouts.filter(workout => workout.date === selectedDate);
        setResults(filtered);
    };

    return (
        <div className="search-container">
            <DatePicker 
                selected={searchDate}
                onChange={(date) => setSearchDate(date)}
            />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {results.map((workout) => (
                    <li key={workout.id}>
                        {workout.date} - {workout.timeStarted}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Search;
