const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 7001;
const cors = require('cors');
const bodyParser = require('body-parser');

const { v4: uuidv4 } = require('uuid');

const apiKey = 'AIzaSyB1UOBnfU2NMx2soTgoz1BqhcA2jkhzflA'; // Replace with your Google Maps API key

app.use(cors());
app.use(bodyParser.json());

// Function to get coordinates of a city using Google Geocoding API
const getCoordinates = async (city) => {
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`;
    try {
        const response = await axios.get(geocodeUrl);
        if (response.data.results && response.data.results.length > 0) {
            const location = response.data.results[0].geometry.location;
            return location; // Returns { lat: ..., lng: ... }
        } else {
            throw new Error('City not found');
        }
    } catch (error) {
        throw new Error('Error fetching city coordinates');
    }
};

// Function to get restaurants using Google Places API
const getRestaurants = async (lat, lon) => {
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=5000&type=restaurant&key=${apiKey}`;
    try {
        const response = await axios.get(placesUrl);
        return response.data.results; // Returns an array of restaurant results
    } catch (error) {
        throw new Error('Error fetching restaurant data');
    }
};

// Endpoint to fetch restaurants for a given city
app.post('/restaurants', async (req, res) => {
    const city = req.body.city;

    if (!city) {
        return res.status(400).send('Please provide a city name');
    }

    try {
        // Step 1: Get the coordinates of the city
        const location = await getCoordinates(city);

        // Step 2: Get the restaurants near the city's coordinates
        const restaurants = await getRestaurants(location.lat, location.lng);

        const transformedRestaurants = restaurants.map(restaurant => transformRestaurantData(restaurant));
        console.log("ans:", transformedRestaurants);

        // Return the restaurant data
        res.json(transformedRestaurants);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Transform the restaurant data
const transformRestaurantData = (googleData) => {
    console.log('Transforming Restaurant Data:', googleData); 
    const transformedData = {
        _id: uuidv4(), // Generate a unique ID
        id: null, // Set the restaurant ID to null or assign a value if available
        name: googleData.name,
        city_id: 4, // Assuming this is a static value for now (you can change as needed)
        class: googleData.price_level !== undefined ? '$'.repeat(googleData.price_level) : null, // Price class (e.g., $$)
        breakfast: 2.2, // Assuming these are static or calculated elsewhere
        lunch: 2.3,
        dinner: 2.7,
        rating: googleData.rating ? parseFloat(googleData.rating.toFixed(2)) : null, // Ensure rating is a float
        rating_count: googleData.user_ratings_total || 0, // Fallback to 0 if no rating count available
        lat: googleData.geometry && googleData.geometry.location ? googleData.geometry.location.lat : null,
        lng: googleData.geometry && googleData.geometry.location ? googleData.geometry.location.lng : null,
        site_url: `https://www.google.com/search?q=${encodeURIComponent(googleData.name)}`,
        img_url: googleData.photos && googleData.photos.length > 0 
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${googleData.photos[0].photo_reference}&key=${apiKey}` 
            : "https://picsum.photos/200/300?image=14" // Fallback image
    };

    console.log('Transformed Restaurant Data:', transformedData); // Log the transformed data
    return transformedData;
};

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
