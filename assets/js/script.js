// DOM Elements
const userSearch = document.querySelector("#city-search");
const searchButton = document.querySelector(".search-btn");
const currentForecast = document.querySelector(".current-forecast");
const searchHistory = document.querySelector(".search-history");

const apiKey = "530886ee7df4842ed6caba305a22369e";

// Save search to local storage and add to search history
function saveSearch(city) {
  const cities = JSON.parse(localStorage.getItem("cities")) || [];
  if (!cities.includes(city)) {
    cities.unshift(city);
    localStorage.setItem("cities", JSON.stringify(cities));
    addCityButton(city);
  }
}

function fetchCityData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    displayWeather(data);
    saveSearch(city);
  })
  .catch(error => {
    console.log("Error fetching data: " + error);
    alert('Failed to retrieve data for ' + city);
  })
}

const displayWeather = (data) => {
  let currentDate = new Date().toLocaleDateString();
  const temperatureFahrenheit = ((data.main.temp - 273.15) * 9) /5 + 32;
  const iconCode = data.weather[0].icon;
  const iconURL = `http://openweathermap.org/img/wn/${iconCode}.png`;

  const icon = document.createElement("img");
  icon.src = iconURL;
  icon.alt = "Weather Icon";

  currentForecast.innerHTML = `
  <h1 class ="fw-bold m-2">${data.name} (${currentDate})</h1>
  <div>${icon.outerHTML}</div>
  <p class ="m-2>temp: ${temperatureFahrenheit.toFixed(2)}°F
  </br>wind: ${data.wind.speed} MPH
  </br>humidity: ${data.main.humidity}%</p>`
}

// Add city button to search history
function addCityButton(city) {
  const button = document.createElement('button');
  button.textContent = city;
  button.className = 'btn m-2 btn-primary city-btn';
  button.addEventListener('click', () => fetchCityData(city));
}

// Add event listener to search button
searchButton.addEventListener("click", (event) => {
  event.preventDefault();
  const city = userSearch.value.trim();
  if (city) {
    fetchCityData(city);
    userSearch.value = '';
    searchHistory.appendChild(button);
  } else {
    userSearch.innerHTML = '<span style="color:red">Please enter city name</span>';
  }
});








// const searchButtonHandler = (e) => {
//   event.preventDefault();
//   const city = userSearch.value.trim();
//   if (city) {
//     for (let i = 0; i < 8 )
//   }
// }

// const userSearch = document.querySelector("#city-search");
// const searchButton = document.querySelector(".search-btn");
// const currentForecast = document.querySelector(".current-forecast");

// //API key
// const apiKey = "530886ee7df4842ed6caba305a22369e";

// //Get current date
// let currentDate = new Date().toLocaleDateString();

// //Saves last searched city in local storage
// const lastSearched = localStorage.getItem("lastSearched");
// const updateLastSearched = (city) => {
//   localStorage.setItem("lastSearched", city);
// };

// //Load default Atlanta forecast
// const loadDefaultForecast = () => {
//   getWeather("Atlanta");
// };

//   //Search button handler event
//   const searchButtonHandler = function (event) {
//   event.preventDefault();
//   const city = userSearch.value.trim();
//   if (city) {
//     getWeather(city);
//   } else {
//     alert("Please enter a city name");
//   }
// };

//   //Fetch weather data
//   const getWeather = function (city) {
//   const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

//   fetch(currentWeatherUrl)
//     .then(function (response) {
//       if (response.ok) {
//         response.json().then(function (data) {
//           displayWeather(data, city);
//           updateLastSearched(city);
//         });
//       } else {
//         alert("Error: " + response.statusText);
//       }
//     })
//     .catch(function () {
//       alert("Unable to connect to OpenWeather");
//     });
// };

//   //Display current weather info in the top box
//   const displayWeather = function (data, city) {
//   const temperatureFahrenheit = ((data.main.temp - 273.15) * 9) / 5 + 32;
//   const iconCode = data.weather[0].icon;
//   const iconURL = `http://openweathermap.org/img/wn/${iconCode}.png`;

//   const icon = document.createElement("img");
//   icon.src = iconURL;
//   icon.alt = "Weather Icon";

//   currentForecast.innerHTML = `
//           <h1 class="fw-bold m-2">${data.name} (${currentDate})</h1>
//           <div>${icon.outerHTML}</div>
//           <p class="m-2">temp: ${temperatureFahrenheit.toFixed(2)}°F
//           </br>wind: ${data.wind.speed} MPH
//           </br>humidity: ${data.main.humidity}%</p>`;

//   getForecast(city);
// };

// //Displaying 5 day forecast on cards
// const displayForecast = function (data) {
//   const forecastCards = document.querySelector(".forecastCards");
//   forecastCards.innerHTML = "";

//   for (let i = 0; i < 5; i++) {
//     const forecast = data.list[i * 8];
//     const date = new Date(forecast.dt * 1000);
//     const temperatureFahrenheit = ((forecast.main.temp - 273.15) * 9) / 5 + 32;
//     const iconCode = forecast.weather[0].icon;
//     const iconURL = `http://openweathermap.org/img/wn/${iconCode}.png`;

//     const card = document.createElement("div");
//     card.classList.add("card", "m-3");
//     card.style.width = "10rem";

//     const cardBody = document.createElement("div");
//     cardBody.classList.add("card-body");

//     const cardTitle = document.createElement("h5");
//     cardTitle.classList.add("card-title");
//     cardTitle.textContent = date.toLocaleDateString("en-US", {
//       month: "numeric",
//       day: "numeric",
//       year: "numeric",
//     });

//     const icon = document.createElement("img");
//     icon.src = iconURL;
//     icon.alt = "Weather Icon";

//     const cardText1 = document.createElement("p");
//     cardText1.classList.add("card-text");
//     cardText1.textContent = `Temp: ${temperatureFahrenheit.toFixed(2)}°F`;

//     const cardText2 = document.createElement("p");
//     cardText2.classList.add("card-text");
//     cardText2.textContent = `Wind: ${forecast.wind.speed} MPH`;

//     const cardText3 = document.createElement("p");
//     cardText3.classList.add("card-text");
//     cardText3.textContent = `Humidity: ${forecast.main.humidity}%`;

//     cardBody.appendChild(cardTitle);
//     cardBody.appendChild(icon);
//     cardBody.appendChild(cardText1);
//     cardBody.appendChild(cardText2);
//     cardBody.appendChild(cardText3);
//     card.appendChild(cardBody);

//     forecastCards.appendChild(card);
//   }
// };

// //Fetch forecast data
// const getForecast = function (city) {
//   const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

//   fetch(forecastWeatherUrl)
//     .then(function (response) {
//       if (response.ok) {
//         response.json().then(function (data) {
//           displayForecast(data);
//         });
//       } else {
//         alert("Error: " + response.statusText);
//       }
//     })
//     .catch(function () {
//       alert("Unable to connect to OpenWeather");
//     });
// };

// //Page refreshes back to last searched OR loads default(Atlanta)
// if (lastSearched) {
//   getWeather(lastSearched);
// } else {
//   loadDefaultForecast();
// }

// //Search button click event
// searchButton.addEventListener("click", searchButtonHandler);

// //City buttons click event
// const cityButtons = document.querySelectorAll(".city-btn");
// cityButtons.forEach(function (button) {
//     button.addEventListener("click", function () {
//         const city = this.textContent.trim();
//         getWeather(city);
//   });
// });
