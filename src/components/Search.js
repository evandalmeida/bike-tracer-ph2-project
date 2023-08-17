import React, { useState } from 'react';

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        fetch(`http://localhost:3000/workouts/search?term=${searchTerm}`)
            .then(response => response.json())
            .then(data => setResults(data))
    };

    return (
        <div className="search-container">
            <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search workouts..."
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
