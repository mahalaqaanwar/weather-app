// // script.js
// function getWeather() {
//     const apiKey = "9095e631daa1271218de38a006847f3a";
//     const city = document.getElementById("city").value;

//     if (!city) {
//         alert("Please enter a city.");
//         return;
//     }

//     const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
//     const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

//     // Fetch current weather
//     fetch(currentWeatherUrl)
//         .then(response => response.json())
//         .then(data => {
//             displayweather(data);
//      })
//         .catch(error => {
//             console.error('Error fetching current weather data:', error);
//             alert('Error fetching weather data. Please try again later.');
//         });
//      }

//     // Fetch weather forecast
//     fetch(forecastUrl)
//         .then(response => response.json())
//         .then(data => {
//             displayHourlyForecast(data.list);
//         })
//         .catch(error => {
//             console.error('Error fetching hourly forecast data:', error);
//             alert('Error fetching hourly forecast data. Please try again later.');
//         });
function getWeather() {
    const apiKey = "9095e631daa1271218de38a006847f3a";
    const city = document.getElementById("city").value;

    if (!city) {
        alert("Please enter a city.");
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch current weather
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayweather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching weather data. Please try again later.');
        });

    //  Fetch forecast INSIDE the function
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again later.');
        });
}



function displayweather(data) {
    const tempDiv = document.getElementById("temp-div");
    const weatherInfoDiv = document.getElementById("weather-info");
    const weatherIcon = document.getElementById("weather-icon");
    const hourlyForecastDiv = document.getElementById("hourly-forecast");

    // Clear previous content
    tempDiv.innerHTML = "";
    weatherInfoDiv.innerHTML = "";
    hourlyForecastDiv.innerHTML = "";

    if (data.cod === "404") {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const country = data.sys.country;
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHtml = `<p>${temperature}°C</p>`;
        const weatherHtml = `<p>${cityName}, ${country}</p><p>${description}</p>`;
        
        tempDiv.innerHTML = temperatureHtml;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;
        weatherIcon.style.display = "block";
    }
}

function displayHourlyForecast(forecastList) {
    const hourlyForecastDiv = document.getElementById("hourly-forecast");
    hourlyForecastDiv.innerHTML = ""; // Clear previous forecast

    const next24Hours = forecastList.slice(0, 8); // next 8 entries = 24 hours (3-hour steps)

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hours = dateTime.getHours();
        const temperature = Math.round(item.main.temp); // Convert from Kelvin to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hours}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>    
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}


function showImage() {
    const weatherIcon = document.getElementById("weather-icon");
    weatherIcon.style.display = "block";
}