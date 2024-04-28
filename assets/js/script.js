// DOM Elements
const userSearch = document.querySelector("#city-search");
const searchButton = document.querySelector(".search-btn");
const currentForecast = document.querySelector(".current-forecast");
const searchHistory = document.querySelector(".search-history");
const forecastCards = document.querySelector(".forecastCards");

// API Key
const apiKey = "530886ee7df4842ed6caba305a22369e";

// Load city buttons from local storage
loadCities();

// Fetch city and weather data
function fetchCityData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayWeather(data);
      saveSearch(city);
      getForecast(city)
    })
    .catch((error) => {
      console.log("Error fetching data: " + error);
      alert("Failed to retrieve data for " + city);
    });
}

// fetch for five day forecast
const getForecast = (city) => {
  const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(forecastWeatherUrl)
    .then((response) => response.json())
    .then((data) => {
      displayForecast(data);
    })
    .catch((error) => {
      console.log("Error fetching data: " + error);
      alert("Failed to retrieve data for " + city);
    });
};

const displayWeather = (data) => {
  let currentDate = new Date().toLocaleDateString();
  const temperatureFahrenheit = ((data.main.temp - 273.15) * 9) / 5 + 32;
  const iconCode = data.weather[0].icon;
  const iconURL = `http://openweathermap.org/img/wn/${iconCode}.png`;

  const icon = document.createElement("img");
  icon.src = iconURL;
  icon.alt = "Weather Icon";

  currentForecast.innerHTML = `
  <h1 class="fw-bold m-2">${data.name} (${currentDate})</h1>
  <div>${icon.outerHTML}</div>
  <p class="m-2">temp: ${temperatureFahrenheit.toFixed(2)}°F
  </br>wind: ${data.wind.speed} MPH
  </br>humidity: ${data.main.humidity}%</p>`;
};


// Display five day forecast on cards
const displayForecast = function (data) {
  forecastCards.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const forecast = data.list[i * 8];
    const date = new Date();
    date.setDate(date.getDate() + (i + 1));
    const temperatureFahrenheit = ((forecast.main.temp - 273.15) * 9) / 5 + 32;
    const iconCode = forecast.weather[0].icon;
    const iconURL = `http://openweathermap.org/img/wn/${iconCode}.png`;

    const icon = document.createElement("img");
    icon.src = iconURL;
    icon.alt = "Weather icon";

    const card = document.createElement("div");
    card.classList.add("card", "m-3");
    card.innerHTML = `
      <h5>${date.toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      })}</h5> 
    <div>${icon.outerHTML}</div>
    <p>Temp: ${temperatureFahrenheit.toFixed(2)}°F</p>
    <p>Wind: ${forecast.wind.speed} MPH</p>
    <p>Humidity: ${forecast.main.humidity}%`;

    forecastCards.appendChild(card);
  }
};

// Save search to local storage and add to search history
function saveSearch(city) {
  const cities = JSON.parse(localStorage.getItem("cities")) || [];
  if (!cities.includes(city)) {
    cities.unshift(city);
    localStorage.setItem("cities", JSON.stringify(cities));
    addCityButton(city);
  }
}

// Function to capitalize first letter of the city on button
function capitalize(str) {
  if (!str) return str;
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Add city button to search history and make sure duplicates don't show up
function addCityButton(city) {
  const existingButton = Array.from(
    searchHistory.querySelectorAll("button")
  ).find((btn) => btn.textContent === city);

  if (!existingButton) {
    const button = document.createElement("button");
    button.textContent = capitalize(city);
    button.className = "btn m-2 btn-primary city-btn";
    button.setAttribute("data-city", city);
    button.addEventListener("click", () => fetchCityData(city));
    searchHistory.appendChild(button);
  }
}

// Add event listener to search button
searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  const city = userSearch.value.trim();
  if (city) {
    fetchCityData(city);
    getForecast(city);
    userSearch.value = "";
  } else {
    alert("Please enter a city");
  }
});

// Function to load cities from local storage and create buttons
function loadCities() {
  const cities = JSON.parse(localStorage.getItem("cities")) || [];
  cities.forEach((city) => {
    addCityButton(city);
  });
}
