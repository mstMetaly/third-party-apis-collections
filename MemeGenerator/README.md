# Meme Generator

A simple front-end meme generator that fetches a random meme image and title from the public [Meme API](https://meme-api.com/). The app loads one meme on page load and lets you fetch another with a button click.

## Features

- Fetches random memes from the Meme API
- Rotates through a predefined list of subreddits
- Updates the meme image and title dynamically in the browser
- Built with plain HTML, CSS, and JavaScript

## API Used

- Meme API: `https://meme-api.com/gimme/`

## Meme Sources

The app randomly selects memes from these subreddits:

- `catmemes`
- `wholesomemes`
- `dogmemes`
- `me_irl`

## Project Structure

- `index.html` - app markup
- `style.css` - app styling
- `script.js` - meme fetch logic and UI updates

## How to Run

Because the HTML file references assets with absolute paths (`/style.css` and `/script.js`), run it through a local static server instead of opening the file directly in the browser.

Example using VS Code Live Server:

1. Open the `MemeGenerator` folder in VS Code
2. Start Live Server
3. Open the generated local URL in your browser

You can also use any simple static server that serves the folder as the web root.

## How It Works

1. The page loads and automatically requests a meme from a random subreddit.
2. The app fetches meme data from the Meme API.
3. After the image finishes loading, the UI updates the meme image and title.
4. Clicking `Get Meme` repeats the process.
