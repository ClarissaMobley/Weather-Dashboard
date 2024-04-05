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

const displayWeather = function(data, city) {
    currentForecast.innerHTML = `
        <h1 class="fw-bold">${data.name} (${currentDate})</h1>
        </br>temp:${data.main.temp}`;
};



//   for (let i = 5; i < forecastCards.length; i++) {
//     document.querySelector(".forecastCards").innerHTML += `
//     <div class="card" style="width: 18rem;">
//     <div class="card-body">
//     <h5 class="card-title">Card title</h5>
//     <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
//     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//     <a href="#" class="card-link">Card link</a>
//     <a href="#" class="card-link">Another link</a>
//     </div>
//     </div>`;
//   }

