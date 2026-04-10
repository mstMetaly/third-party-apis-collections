# Spotify API Projects

This folder contains multiple Spotify integration experiments built with the Spotify Web API and Spotify authentication flows. It includes a simple browser-based playlist explorer and a separate playback-focused project with an Express backend and React frontend.

## Included Projects

### 1. `SpotifyServer`

A plain HTML, CSS, and JavaScript app that:

- requests an access token using the Spotify Accounts API
- fetches Spotify browse categories
- loads playlists for a selected category
- lists tracks from a selected playlist
- shows basic track details such as title, artist, and album art

### 2. `SpotifyPlayBackServer`

A playback-oriented project split into backend and frontend parts:

- `backend` provides Spotify login, callback, token refresh, genre, and playlist endpoints using Express
- `frontend` contains a React app for login, genre selection, and playlist browsing
- the top-level `app.js` in this project also includes browser-side playback logic using the Spotify Web Playback SDK

## APIs and SDKs Used

These projects use Spotify platform services such as:

- Spotify Accounts API for authorization and token exchange
- Spotify Web API for categories, playlists, and tracks
- Spotify Web Playback SDK for browser playback integration

## Main Features

- Spotify login and token handling
- Browse music categories and playlists
- Fetch playlist tracks
- Show selected track details
- Prototype playback support with the Web Playback SDK

## Project Structure

- `SpotifyServer/` - simple browser-based Spotify Web API demo
- `SpotifyPlayBackServer/backend/` - Express backend for auth and API proxy endpoints
- `SpotifyPlayBackServer/frontend/` - React frontend for login and browsing
- `SpotifyPlayBackServer/app.js` - browser playback prototype using Spotify login and player setup

## Setup Notes

These projects require Spotify developer credentials and valid redirect URIs configured in the Spotify Developer Dashboard.

Before running, update the app configuration with your own values for:

- Spotify client ID
- Spotify client secret
- redirect URI

It is safer to keep these values in environment variables or local config files rather than hardcoding them in source files.

## How to Run

### `SpotifyServer`

1. Open the `SpotifyServer` project with a local static server
2. Configure valid Spotify credentials in the app
3. Load the page in the browser
4. Select a category, then a playlist, and fetch tracks

### `SpotifyPlayBackServer`

1. Start the backend server from `SpotifyPlayBackServer/backend`
2. Start the React frontend from `SpotifyPlayBackServer/frontend`
3. Configure matching redirect URIs and Spotify app credentials
4. Log in with Spotify and test genre or playlist loading

## Notes

- Some files currently contain hardcoded Spotify credentials and should be sanitized before pushing to a public repository.
- Playback features depend on Spotify account permissions, token scopes, and Web Playback SDK support in the browser.
