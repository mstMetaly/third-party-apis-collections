let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");

let key = '9620da321619e478f5bfe04a7230105b'; // Replace with your OpenWeatherMap API key
let key2 = '6617304398ab1ff0a41d729324240cf2';

// Function to fetch the weather data
let getWeather = () => {
    let cityValue = cityRef.value;
    if (cityValue.length == 0) {
        result.innerHTML = `<h3 class="msg">Please Enter a city name</h3>`;
    } else {
        // Step 1: Fetch city coordinates first (lat, lon) using the current weather API
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key2}&units=metric`;

        fetch(url)
        .then((resp) => resp.json())
        .then(data => {
            let lat = data.coord.lat;
            let lon = data.coord.lon;

            // Step 2: Fetch the 7-day forecast and other services using One Call API
            let forecastUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${key}&units=metric`;

            fetch(forecastUrl)
            .then((resp) => resp.json())
            .then(forecastData => {
                console.log(forecastData);

                // Display the 7-day weather forecast
                let forecastHTML = `<h2>7-Day Weather Forecast for ${data.name}</h2>`;

                forecastData.daily.forEach((day, index) => {
                    if (index < 7) { // Display only the next 7 days
                        forecastHTML += `
                        <div class="day-forecast">
                            <h4>${new Date(day.dt * 1000).toDateString()}</h4>
                            <img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
                            <p>${day.weather[0].main} - ${day.weather[0].description}</p>
                            <p>Min: ${day.temp.min}&#176;C | Max: ${day.temp.max}&#176;C</p>
                            <p>Humidity: ${day.humidity}%</p>
                            <p>Wind Speed: ${day.wind_speed} m/s</p>
                        </div>`;
                    }
                });

                //extra added
                // Check if there are any weather alerts in the forecast data
                if (forecastData.alerts && forecastData.alerts.length > 0) {
                    forecastHTML += `<h3>Weather Alerts</h3>`;
                    forecastData.alerts.forEach(alert => {
                        forecastHTML += `
                        <div class="alert">
                            <h4>Event: ${alert.event}</h4>
                            <p><strong>Start:</strong> ${new Date(alert.start * 1000).toLocaleString()}</p>
                            <p><strong>End:</strong> ${new Date(alert.end * 1000).toLocaleString()}</p>
                            <p><strong>Description:</strong> ${alert.description}</p>
                        </div>`;
                    });
                } else {
                    forecastHTML += `<h3>No weather alerts</h3>`;
                }
                //extra

                result.innerHTML = forecastHTML;

            }).catch(() => {
                result.innerHTML = `<h3 class="msg">Forecast data not available</h3>`;
            });
        }).catch(() => {
            result.innerHTML = `<h3 class="msg">City not found</h3>`;
        });
    }
};

searchBtn.addEventListener("click", getWeather);
