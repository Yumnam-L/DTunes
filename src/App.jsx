import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Player from './components/Player';
import Login from './components/Login';
import Register from './components/Register';
import './index.css';

const App = () => {
  const [authToken, setAuthToken] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false); // Track registration status
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token); // Automatically log in if token is found
    }
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/search?query=${query}`, {
        headers: {
          Authorization: `Bearer ${authToken}` // Send token with request
        }
      });
      setResults(response.data.items);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  const handleVideoSelect = (videoId) => {
    setSelectedVideoId(videoId);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      {!authToken ? (
        <>
          {!isRegistered ? (
            <Register setIsRegistered={setIsRegistered} />
          ) : (
            <Login setAuthToken={setAuthToken} />
          )}
        </>
      ) : (
        <div>
          <input 
            type="text" 
            value={query}
            onChange={handleInputChange}
            placeholder="Search for music"
          />
          <button onClick={handleSearch}>Search</button>
          <div>
            {results.map(result => (
              <div key={result.id.videoId} onClick={() => handleVideoSelect(result.id.videoId)}>
                <h3>{result.snippet.title}</h3>
                <p>{result.snippet.description}</p>
                <img src={result.snippet.thumbnails.default.url} alt={result.snippet.title} />
              </div>
            ))}
          </div>
          {selectedVideoId && <Player videoId={selectedVideoId} />}
        </div>
      )}
    </div>
  );
};

export default App;


