const userSearch = document.querySelector("#city-search");
const searchButton = document.querySelector(".search-btn");
const currentForecast = document.querySelector(".current-forecast");
const apiKey = "530886ee7df4842ed6caba305a22369e";

let currentDate = new Date().toLocaleDateString();

const searchButtonHandler = function (event) {
  event.preventDefault();

  const city = userSearch.value.trim();

  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name");
  }
};

const getWeather = function (city) {
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  fetch(currentWeatherUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data, city);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function () {
      alert("Unable to connect to OpenWeather");
    });
};

const displayWeather = function (data, city) {
  const temperatureFahrenheit = ((data.main.temp - 273.15) * 9) / 5 + 32;

  currentForecast.innerHTML = `
          <h1 class="fw-bold">${data.name} (${currentDate})</h1>
          </br>temp: ${temperatureFahrenheit.toFixed(2)}°F
          </br>wind: ${data.wind.speed} MPH
          </br>humidity: ${data.main.humidity}%`;
};


//   for (let i = 5; i < forecastCards.length; i++) {
//     document.querySelector(".forecastCards").innerHTML += `
//     <div class="card" style="width: 18rem;">
//     <div class="card-body">
//     <h5 class="card-title"></h5>
//     <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     <a href="#" class="card-link">Card link</a>
//     <a href="#" class="card-link">Another link</a>
//     </div>
//     </div>`;
//   }
