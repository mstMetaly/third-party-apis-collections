const express = require('express');
const request = require('request');
const cors = require('cors');
const querystring = require('querystring');

const app = express();
app.use(cors());
const clientId = 'd1b5efba21f4404da4282f338ba4375c';
const clientSecret = '35a58a7a49e749ccaa0147f8f78b0e70';
const redirectUri = 'http://localhost:3007/callback'; // React App URL

// Generates a random string for state parameter
const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

app.get('/refresh_token', (req, res) => {
    const refreshToken = req.query.refresh_token;

    if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token is required' });
    }

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
        },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        },
        json: true
    };

    request.post(authOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const accessToken = body.access_token;
            const refreshToken = body.refresh_token; // Get the refresh token from the response
            console.log("Access token received: ", accessToken);
            console.log("Refresh token received: ", refreshToken);
            // Redirect to the React app with token in local storage
            res.redirect(`http://localhost:3000/#access_token=${accessToken}&refresh_token=${refreshToken}`);
        } else {
            console.error('Error fetching access token:', error);
            res.sendStatus(500);
        }
    });
    
});


// Step 1: Login route to redirect to Spotify's login
app.get('/login', (req, res) => {
    const state = generateRandomString(16);

    const scope = 'streaming user-read-email user-read-private user-modify-playback-state';

    console.log("here in login ");
    res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state
    }));
    console.log("after login");
});

// Step 2: Callback route for Spotify after user authorizes the app
app.get('/callback', (req, res) => {
    const code = req.query.code || null;

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
        },
        json: true
    };

    request.post(authOptions, (error, response, body) => {
        const accessToken = body.access_token;
        const refreshToken = body.refresh_token;  // Store the refresh token
        if (!error && response.statusCode === 200) {
            // Store both tokens in your session or database
            res.redirect(`http://localhost:3000/#access_token=${accessToken}&refresh_token=${refreshToken}`);
        } else {
            res.redirect('/error');
        }
    });
});



// Step 3: Endpoint to fetch genres using the access token
app.get('/genres', (req, res) => {
    const token = req.query.access_token;
    const options = {
        url: 'https://api.spotify.com/v1/browse/categories',
        headers: { 'Authorization': 'Bearer ' + token },
        json: true
    };

    request.get(options, (error, response, body) => {
        if (error || response.statusCode !== 200) {
            console.error('Error fetching genres:', error || body);
            return res.status(response.statusCode).json({ error: body || 'Failed to fetch genres' });
        }

        // Safely check if body.categories and body.categories.items exist
        if (body && body.categories && body.categories.items) {
            res.json(body.categories.items);
        } else {
            console.error('Unexpected response format:', body);
            res.status(500).json({ error: 'Unexpected response format' });
        }
    });
});


// Step 4: Endpoint to fetch playlists by genre using the access token
app.get('/playlists', (req, res) => {
    const token = req.query.access_token;
    const genreId = req.query.genreId;
    const options = {
        url: `https://api.spotify.com/v1/browse/categories/${genreId}/playlists`,
        headers: { 'Authorization': 'Bearer ' + token },
        json: true
    };
    request.get(options, (error, response, body) => {
        res.json(body.playlists.items);
    });
});

app.listen(3007, () => {
    console.log('Backend server running on port 3007');
});
