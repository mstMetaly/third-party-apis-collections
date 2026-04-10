# News App

A simple browser-based news application that fetches top headlines by category using the [NewsAPI](https://newsapi.org/) service. The app loads general headlines on startup and lets users switch between multiple news categories.

## Features

- Fetches top headlines from NewsAPI
- Supports category-based filtering
- Displays article image, title, description, and source link
- Built with plain HTML, CSS, and JavaScript

## API Used

- NewsAPI Top Headlines endpoint: `https://newsapi.org/v2/top-headlines`

## Categories

The app provides these built-in categories:

- `general`
- `entertainment`
- `health`
- `science`
- `sports`
- `technology`

## Configuration

This project expects an `apiKey` value in `api-key.js`.

Example:

```js
apiKey = "your_newsapi_key";
```

You can generate your own API key from NewsAPI and place it in that file before running the app.

## Project Structure

- `index.html` - main page structure
- `api-key.js` - API key configuration
- `Script/script.js` - fetch logic and UI rendering
- `Style/style.css` - app styling

## How to Run

Because the HTML file references assets using absolute paths like `/Style/style.css` and `/Script/script.js`, run the project through a local static server instead of opening the file directly.

Example using VS Code Live Server:

1. Open the `NewsApp` folder in VS Code
2. Start Live Server
3. Open the generated local URL in your browser

Any static server that serves the `NewsApp` folder as the site root will also work.

## How It Works

1. The app loads `general` headlines on page load.
2. Category buttons are created dynamically in the UI.
3. Clicking a category requests a new set of headlines for that category.
4. Each article is rendered as a card with an image, summary, and `Read More` link.
