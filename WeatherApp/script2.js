let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");

let key = '6617304398ab1ff0a41d729324240cf2'; // Add your OpenWeatherMap API key here

// Function to fetch weather details from One Call API and show them
let getWeather = () => {
    let cityValue = cityRef.value;
    if (cityValue.length == 0) {
        result.innerHTML = `<h3 class="msg">Please Enter a city name</h3>`;
    } else {
        // Fetch city coordinates first (lat, lon)
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;

        fetch(url).then((resp) => resp.json()).then(data => {
            let lat = data.coord.lat;
            let lon = data.coord.lon;

            // Now fetch the 7-day forecast using One Call API
            let forecastUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${key}&units=metric`;

            fetch(forecastUrl).then((resp) => resp.json()).then(forecastData => {
                console.log(forecastData);

                // Display the forecast for the next 7 days
                let forecastHTML = `<h2>7-Day Weather Forecast for ${data.name}</h2>`;

                forecastData.daily.forEach((day, index) => {
                    if (index < 7) { // Only show the next 7 days
                        forecastHTML += `
                        <div class="day-forecast">
                            <h4>${new Date(day.dt * 1000).toDateString()}</h4>
                            <img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
                            <p>${day.weather[0].main} - ${day.weather[0].description}</p>
                            <p>Min: ${day.temp.min}&#176;C | Max: ${day.temp.max}&#176;C</p>
                        </div>`;
                    }
                });

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
window.addEventListener("load", getWeather);
