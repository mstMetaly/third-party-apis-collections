import React, { useState, useEffect } from 'react';

function App() {
    const [token, setToken] = useState('');
    const [genres, setGenres] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');

    useEffect(() => {
        // Get token from URL after Spotify login
        const hash = window.location.hash;
        let _token = window.localStorage.getItem('spotify_token');
        
        if (!_token && hash) {
            _token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1];
            window.location.hash = "";
            window.localStorage.setItem('spotify_token', _token);
        }

        setToken(_token);
    }, []);

    const fetchGenres = async () => {
        const response = await fetch(`http://localhost:3004/genres?access_token=${token}`);
        const data = await response.json();
        setGenres(data);
    };

    const fetchPlaylists = async (genreId) => {
        const response = await fetch(`http://localhost:3004/playlists?access_token=${token}&genreId=${genreId}`);
        const data = await response.json();
        setPlaylists(data);
    };

    return (
        <div className="App">
            {!token ? (
                <a className="btn btn-primary" href="http://localhost:3004/login">Login to Spotify</a>
            ) : (
                <div>
                    <button className="btn btn-secondary" onClick={fetchGenres}>Get Genres</button>
                    <select onChange={e => fetchPlaylists(e.target.value)}>
                        <option value="">Select Genre</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>{genre.name}</option>
                        ))}
                    </select>

                    <div>
                        <h3>Playlists</h3>
                        <ul>
                            {playlists.map((playlist) => (
                                <li key={playlist.id}>{playlist.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
