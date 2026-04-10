// let result = document.getElementById("result");
// let searchBtn = document.getElementById("search-btn");
// let cityRef = document.getElementById("city");

// let apiKey = 'fd166f18b262a2b'; // Replace with your Google Maps API key

// // Function to get coordinates of the city using Google Geocoding API
// let getCoordinates = (cityName) => {
//     let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=${apiKey}`;
//     return fetch(geocodeUrl)
//         .then(response => response.json())
//         .then(data => {
//             if (data.results && data.results.length > 0) {
//                 let location = data.results[0].geometry.location;
//                 return location; // Returns an object { lat: ..., lng: ... }
//             } else {
//                 throw new Error("City not found");
//             }
//         });
// };

// // Function to fetch nearby hotels using Google Places API
// let getHotels = (lat, lon) => {
//     let placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=5000&type=lodging&key=${apiKey}`;
//     return fetch(placesUrl)
//         .then(response => response.json())
//         .then(data => data.results); // Returns an array of hotel results
// };

// // Function to display hotels
// let displayHotels = (hotels) => {
//     let hotelsHTML = `<h2>Hotels Near You</h2>`;
//     hotels.forEach(hotel => {
//         hotelsHTML += `
//             <div class="hotel">
//                 <h3>${hotel.name}</h3>
//                 <p>Rating: ${hotel.rating}</p>
//                 <p>Address: ${hotel.vicinity}</p>
//             </div>`;
//     });
//     result.innerHTML = hotelsHTML;
// };

// // Function to search for hotels based on city input
// let searchHotels = () => {
//     let cityValue = cityRef.value;
//     if (cityValue.length == 0) {
//         result.innerHTML = `<h3 class="msg">Please Enter a city name</h3>`;
//     } else {
//         getCoordinates(cityValue)
//             .then(location => {
//                 return getHotels(location.lat, location.lng);
//             })
//             .then(hotels => {
//                 displayHotels(hotels);
//             })
//             .catch(error => {
//                 result.innerHTML = `<h3 class="msg">${error.message}</h3>`;
//             });
//     }
// };

// searchBtn.addEventListener("click", searchHotels);
//

let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");

let apiKey = 'AIzaSyB1UOBnfU2NMx2soTgoz1BqhcA2jkhzflA'; // Replace with your Google Maps API key

// Function to get coordinates of the city using Google Geocoding API
let getCoordinates = (cityName) => {
    let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${cityName}&key=${apiKey}`;
    console.log("Fetching coordinates from:", geocodeUrl); // Debugging
    return fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Geocode response:", data); // Debugging
            if (data.status === "OK" && data.results && data.results.length > 0) {
                let location = data.results[0].geometry.location;
                return location; // Returns an object { lat: ..., lng: ... }
            } else {
                throw new Error("City not found");
            }
        });
};

// Function to fetch nearby hotels using Google Places API
let getHotels = (lat, lon) => {
    let placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=5000&type=lodging&key=${apiKey}`;
    console.log("Fetching hotels from:", placesUrl); // Debugging
    return fetch(placesUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Places API response:", data); // Debugging
            return data.results;
        });
};

// Function to display hotels
let displayHotels = (hotels) => {
    let hotelsHTML = `<h2>Hotels Near You</h2>`;
    if (hotels.length === 0) {
        hotelsHTML += `<p>No hotels found in this location.</p>`;
    }
    hotels.forEach(hotel => {
        hotelsHTML += `
            <div class="hotel">
                <h3>${hotel.name}</h3>
                <p>Rating: ${hotel.rating}</p>
                <p>Address: ${hotel.vicinity}</p>
            </div>`;
    });
    result.innerHTML = hotelsHTML;
};

// Function to search for hotels based on city input
let searchHotels = () => {
    let cityValue = cityRef.value;
    if (cityValue.length == 0) {
        result.innerHTML = `<h3 class="msg">Please Enter a city name</h3>`;
    } else {
        getCoordinates(cityValue)
            .then(location => {
                return getHotels(location.lat, location.lng);
            })
            .then(hotels => {
                displayHotels(hotels);
            })
            .catch(error => {
                console.error("Error:", error); // Debugging
                result.innerHTML = `<h3 class="msg">${error.message}</h3>`;
            });
    }
};

searchBtn.addEventListener("click", searchHotels);
