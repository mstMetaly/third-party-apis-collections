# FacialExpression

This folder contains a simple Node.js example for sending an image to a facial expression analysis API and printing the response in the console.

## What is implemented

- `server.js`
  A small script that sends a POST request to a face analysis API using `axios` and `form-data`.
- `1-1.jpg`
  Sample image file intended for facial analysis testing.

## API used

This project uses the RapidAPI-hosted Face Analyzer service.

### Face Analyzer API via RapidAPI

- Endpoint:
  `https://faceanalyzer-ai.p.rapidapi.com/faceanalysis`
- Method:
  `POST`
- Purpose:
  Analyze a face image and return facial analysis data.
- Authentication:
  Uses RapidAPI headers:
  - `x-rapidapi-key`
  - `x-rapidapi-host`

## How the code works

1. `server.js` creates a `FormData` object.
2. It adds an image value to the request payload.
3. It sends the request with `axios`.
4. The API response is logged to the console.

## Libraries used

- `axios`
  For making the HTTP request.
- `form-data`
  For building the multipart form payload.
- `fs`
  Imported in the file, though it is not currently used in the active implementation.

## Current implementation note

The current script appends:

```js
data.append('image', '1-1.jpg');
```

That means it is sending the filename as text, not the actual image file stream. In most real API integrations, this usually needs to be replaced with an actual file upload, for example using a read stream.

A more typical approach would look like:

```js
data.append('image', fs.createReadStream('./1-1.jpg'));
```

## How to run

Install dependencies first:

```bash
npm install axios form-data
```

Then run:

```bash
node server.js
```

## Expected output

- If the request succeeds, the API response is printed in the terminal.
- If the request fails, the error is printed in the terminal.

## Security note

- The API key is currently hardcoded in `server.js`.
- For safer usage, move the key into environment variables before sharing or deploying the project.

## Summary

This folder is a basic facial expression analysis demo that shows how to call a third-party image analysis API from Node.js using a sample image and print the result.
