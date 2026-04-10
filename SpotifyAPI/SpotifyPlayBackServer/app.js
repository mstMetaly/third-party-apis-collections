const APIController = (function() {
    const clientId = 'db4a2611f2924d20a9ff939b3affcffc';
    const redirectUri = 'https://localhost:3004/spotify';
    let accessToken = '';
    let player = null;

    // Helper to generate random strings (used for PKCE or state)
    const generateRandomString = length => {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };

    // Redirect user to Spotify login page
    const redirectToSpotifyLogin = () => {
        const state = generateRandomString(16);
        const scope = 'user-read-private user-read-email streaming user-modify-playback-state';
        window.location = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${encodeURIComponent(scope)}&redirect_uri=${redirectUri}&state=${state}`;
    };

    // Get token from URL
    const getTokenFromUrl = () => {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        accessToken = params.get('access_token');
        if (accessToken) {
            localStorage.setItem('spotify_access_token', accessToken);
        }
        else{
            console.log("access token not found  ", accessToken);
        }
    };

    // Load saved token from localStorage
    const loadToken = () => {
        const token = localStorage.getItem('spotify_access_token');
        if (!token) {
            // Redirect to Spotify login if no token is found
            APIController.redirectToSpotifyLogin();
            return null;
        }
        return token;
    };
    

    // Fetch genres from Spotify
    const getGenres = async token => {
        const result = await fetch('https://api.spotify.com/v1/browse/categories', {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await result.json();
        console.log(data);  // Log the full response to inspect it
        if (data.categories && data.categories.items) {
            return data.categories.items;
        }
        return [];
    };
    

    // Fetch playlists by genre
    const getPlaylistsByGenre = async (token, genreId) => {
        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists`, {
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await result.json();
        return data.playlists.items;
    };

    return {
        redirectToSpotifyLogin,
        getTokenFromUrl,
        loadToken,
        getGenres,
        getPlaylistsByGenre
    };
})();

const UIController = (function() {
    const DOMElements = {
        selectGenre: '#select_genre',
        selectPlaylist: '#select_playlist',
        playButton: '#play',
        pauseButton: '#pause'
    };

    return {
        inputField() {
            return {
                genre: document.querySelector(DOMElements.selectGenre),
                playlist: document.querySelector(DOMElements.selectPlaylist)
            };
        },

        createGenreOption(text, value) {
            const html = `<option value="${value}">${text}</option>`;
            document.querySelector(DOMElements.selectGenre).insertAdjacentHTML('beforeend', html);
        },

        createPlaylistOption(text, value) {
            const html = `<option value="${value}">${text}</option>`;
            document.querySelector(DOMElements.selectPlaylist).insertAdjacentHTML('beforeend', html);
        }
    };
})();

const APPController = (function(UICtrl, APICtrl) {
    const loadGenres = async () => {
        const token = APICtrl.loadToken();
        const genres = await APICtrl.getGenres(token);
        genres.forEach(genre => UICtrl.createGenreOption(genre.name, genre.id));
    };

    const addEventListeners = () => {
        const DOMInputs = UICtrl.inputField();
        
        DOMInputs.genre.addEventListener('change', async () => {
            const genreId = DOMInputs.genre.value;
            const playlists = await APICtrl.getPlaylistsByGenre(APICtrl.loadToken(), genreId);
            playlists.forEach(playlist => UICtrl.createPlaylistOption(playlist.name, playlist.id));
        });

        document.getElementById('play').addEventListener('click', () => {
            player.togglePlay();
        });

        document.getElementById('pause').addEventListener('click', () => {
            player.togglePlay();
        });
    };

    const setupSpotifyPlayer = () => {
        window.onSpotifyWebPlaybackSDKReady = () => {
            const token = APICtrl.loadToken();
            player = new Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(token); }
            });

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            player.connect();
        };
    };

    return {
        init() {
            APICtrl.getTokenFromUrl();
            loadGenres();
            addEventListeners();
            setupSpotifyPlayer();
        }
    };
})(UIController, APIController);

APPController.init();
