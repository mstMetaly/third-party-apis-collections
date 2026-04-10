# Third-Party APIs Collection

This folder contains small projects and demos that integrate with external APIs and services. The collection includes frontend-only apps, Node.js scripts, and Express-based examples for payments, music, email, news, weather, memes, and facial analysis.

## Included Projects

### [emailSend](./emailSend)

- API or service: EmailJS
- Purpose: Send report content by email directly from the browser
- Notes: Frontend-only example using EmailJS templates and local JSON data

### [FacialExpression](./FacialExpression)

- API or service: Face Analyzer API via RapidAPI
- Purpose: Analyze facial expressions from an image
- Notes: Node.js script that submits a multipart request and logs the response

### [GateWay](./GateWay)

- API or service: Stripe
- Purpose: Handle basic payment requests through an Express server
- Notes: Includes a `/charge` endpoint and static frontend assets

### [MemeGenerator](./MemeGenerator)

- API or service: Meme API
- Purpose: Fetch random memes from selected subreddits
- Notes: Static frontend app built with HTML, CSS, and JavaScript

### [NewsApp](./NewsApp)

- API or service: NewsAPI
- Purpose: Show top headlines by category
- Notes: Static frontend app with category filters and client-side article rendering

### [SpotifyAPI](./SpotifyAPI)

- API or service: Spotify Accounts API, Spotify Web API, Spotify Web Playback SDK
- Purpose: Browse genres, playlists, and tracks, plus test playback-related flows
- Notes: Contains both a simple browser demo and a separate backend/frontend playback setup

### [SSLCommerz-NodeJS-master](./SSLCommerz-NodeJS-master)

- API or service: SSLCommerz
- Purpose: Payment gateway integration example
- Notes: Node.js project for payment initiation and transaction flow testing

### [WeatherApp](./WeatherApp)

- API or service: OpenWeatherMap
- Purpose: Look up weather data by city
- Notes: Frontend weather demo with additional weather-related experiment files

## Quick Start

1. Open the project folder you want to run.
2. Install dependencies if the project uses Node.js.
3. Add the required API keys or credentials.
4. Start the server or serve the static files locally.

Example:

```bash
cd ThirdParty/[project-folder]
npm install
```

For static apps, use a local web server instead of opening HTML files directly when the project depends on `fetch()` or absolute asset paths.

## Suggested Environment Variables

```env
STRIPE_SECRET_KEY=your_stripe_secret_key
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
NEWS_API_KEY=your_newsapi_key
OPENWEATHER_API_KEY=your_openweather_key
RAPIDAPI_KEY=your_rapidapi_key
EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

## Security Notes

- Do not commit live API keys, client secrets, or tokens.
- Prefer environment variables or ignored local config files.
- Rotate any credential that has already been exposed in Git history.

## Project Documentation

Some projects include their own README files with setup and usage details:

- [emailSend README](./emailSend/README.md)
- [MemeGenerator README](./MemeGenerator/README.md)
- [NewsApp README](./NewsApp/README.md)
- [SpotifyAPI README](./SpotifyAPI/README.md)
- [SSLCommerz README](./SSLCommerz-NodeJS-master/readme.md)

## Summary

This directory is a compact third-party API playground for experimenting with email delivery, payments, music data, news feeds, weather lookups, memes, and facial analysis.
