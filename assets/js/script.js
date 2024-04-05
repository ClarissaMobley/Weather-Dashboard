const userSearch = document.querySelector("#city-search");
const searchButton = document.querySelector(".search-btn");
const cityButton = document.querySelector(".city-btn");
const currentForecast = document.querySelector(".current-forecast");
const defaultForecast = document.querySelector(".default-forecast");
const forecastCards = document.querySelectorAll(".forecastCards");
const apiKey = "530886ee7df4842ed6caba305a22369e";

const searchButtonHandler = function (event) {
    event.preventDefault();
  
    const city = userSearch.value.trim();
  
    if (city) {
      getWeather(city);

      userSearch.value = "";
    } else {
      alert("Please enter a city name");
    }
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

