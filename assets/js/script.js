const userSearch = document.querySelector("#city-search");
const searchButton = document.querySelector(".search-btn");
const currentForecast = document.querySelector(".current-forecast");
const apiKey = "530886ee7df4842ed6caba305a22369e";

let currentDate = new Date().toLocaleDateString();

const searchButtonHandler = function(event) {
    event.preventDefault();

    const city = userSearch.value.trim();

    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name");
    }
};

const getWeather = function(city) {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    displayWeather(data, city);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function() {
            alert("Unable to connect to OpenWeather");
        });
};

const displayWeather = function(data, city) {
    const temperatureFahrenheit = ((data.main.temp - 273.15) * 9) / 5 + 32;

    currentForecast.innerHTML = `
          <h1 class="fw-bold">${data.name} (${currentDate})</h1>
          </br>temp: ${temperatureFahrenheit.toFixed(2)}°F
          </br>wind: ${data.wind.speed} MPH
          </br>humidity: ${data.main.humidity}%`;

    getForecast(city);
};

const displayForecast = function(data) {
    const forecastCards = document.querySelector(".forecastCards");
    forecastCards.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        const forecast = data.list[i * 8];
        const date = new Date(forecast.dt * 1000);
        const temperatureFahrenheit = ((forecast.main.temp - 273.15) * 9) / 5 + 32;

        const card = document.createElement("div");
        card.classList.add("card", "m-3");
        card.style.width = "10rem";

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const cardTitle = document.createElement("h5");
        cardTitle.classList.add("card-title");
        cardTitle.textContent = date.toLocaleDateString("en-US", { weekday: "long" });

        const cardSubtitle = document.createElement("h6");
        cardSubtitle.classList.add("card-subtitle", "mb-2");
        cardSubtitle.textContent = date.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" });

        const cardText1 = document.createElement("p");
        cardText1.classList.add("card-text");
        cardText1.textContent = `Temp: ${temperatureFahrenheit.toFixed(2)}°F`;

        const cardText2 = document.createElement("p");
        cardText2.classList.add("card-text");
        cardText2.textContent = `Wind: ${forecast.wind.speed} MPH`;

        const cardText3 = document.createElement("p");
        cardText3.classList.add("card-text");
        cardText3.textContent = `Humidity: ${forecast.main.humidity}%`;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardSubtitle);
        cardBody.appendChild(cardText1);
        cardBody.appendChild(cardText2);
        cardBody.appendChild(cardText3);
        card.appendChild(cardBody);

        forecastCards.appendChild(card);
    }
};

const getForecast = function (city) {
    const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
  
    fetch(forecastWeatherUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayForecast(data);
          });
        } else {
          alert("Error: " + response.statusText);
        }
      })
      .catch(function () {
        alert("Unable to connect to OpenWeather");
      });
  };

  searchButton.addEventListener("click", searchButtonHandler);

  const cityButtons = document.querySelectorAll(".city-btn");
  cityButtons.forEach(function (button) {
    button.addEventListener("click", function () {
    const city = this.textContent.trim();
    getWeather(city);
  });
});