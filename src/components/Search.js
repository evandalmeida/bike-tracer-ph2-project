import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function Search() {
    const [searchDate, setSearchDate] = useState(null);
    const [workouts, setWorkouts] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/workouts')
            .then(response => response.json())
            .then(data => setWorkouts(data))
    }, []);

    const handleSearch = () => {
        if (searchDate) {
            const selectedDate = searchDate.toLocaleDateString();
            const filtered = workouts.filter(workout => workout.date === selectedDate);
            setResults(filtered);
        }
    };

    return (
        <div className="search-container">
            <div className='search-tools'>

            <DatePicker className="date-picker" 
                selected={searchDate}
                placeholderText='Select Date Below'
                onChange={(date) => setSearchDate(date)}
                />
            <button className="button" onClick={handleSearch}>Search</button>
            </div>
            <div className='search-display'>
                    {results.map((workout) => (
                        <div className="search-result">
                            <Link to={`/workouts/${workout.id}`} key={workout.id}>
                                    {workout.date}'s ride at {workout.timeStarted}
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Search;
