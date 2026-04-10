const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 7000;
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

// Function to get hotels using Google Places API
const getHotels = async (lat, lon) => {
    const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=5000&type=lodging&key=${apiKey}`;
    try {
        const response = await axios.get(placesUrl);
        return response.data.results; // Returns an array of hotel results
    } catch (error) {
        throw new Error('Error fetching hotel data');
    }
};

// Endpoint to fetch hotels for a given city
app.post('/hotels', async (req, res) => {
    const city = req.body.city;
   // const { city } = req.query; // Extract city from query params

    if (!city) {
        return res.status(400).send('Please provide a city name');
    }

    try {
        // Step 1: Get the coordinates of the city
        const location = await getCoordinates(city);

        // Step 2: Get the hotels near the city's coordinates
        const hotels = await getHotels(location.lat, location.lng);

        const transformedHotels = hotels.map(hotel => transformHotelData(hotel));
        console.log("ans:",transformedHotels);
        //convert them into data
        
        // Return the hotel data
        res.json(transformedHotels);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

const transformHotelData = (googleData) => {
    console.log('Transforming Hotel Data:', googleData); 
    const transformedData = {
        _id: uuidv4(), // Generate a unique ID
        HotelID: null, // Set to null for empty field
        HotelName: googleData.name,
        city_id: null, // Set to null for empty field
        low: null, // Set to null for empty field
        mid: null, // Set to null for empty field
        high: null, // Set to null for empty field
        star: googleData.rating ? Math.round(googleData.rating) : null, // Handle missing rating
        lat: googleData.geometry && googleData.geometry.location ? googleData.geometry.location.lat : null,
        lng: googleData.geometry && googleData.geometry.location ? googleData.geometry.location.lng : null,
        site_url: `https://www.google.com/search?q=${encodeURIComponent(googleData.name)}`,
        img_url: googleData.photos && googleData.photos.length > 0 
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${googleData.photos[0].photo_reference}&key=${apiKey}` 
            : "https://picsum.photos/200/300?image=14" ,
            price_level: googleData.price_level !== undefined ? googleData.price_level : null // Add price level handling// Fallback image
    };

    console.log('Transformed Hotel Data:', transformedData); // Log the transformed data
    return transformedData;

};


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
