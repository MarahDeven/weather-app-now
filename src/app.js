let date = new Date();
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[date.getDay()];
let dateElement = document.querySelector("#date");
dateElement.innerHTML = `${day} ${hours}:${minutes}`;

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let conditionsElement = document.querySelector("#conditions");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  let hiElement = document.querySelector("#hi");
  let loElement = document.querySelector("#lo");

  fahrenheitTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  cityElement.innerHTML = response.data.name;
  conditionsElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  hiElement.innerHTML = Math.round(response.data.main.temp_max);
  loElement.innerHTML = Math.round(response.data.main.temp_min);
}

function search(city) {
  let apiKey = "4af869c2b16527dd3b375c7f352dada0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchCityElement = document.querySelector("#search-city");
  search(searchCityElement.value);
}

function findLocation(position) {
  let apiKey = "4af869c2b16527dd3b375c7f352dada0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let celsiusTemp = ((fahrenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

function showFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current");
currentLocationButton.addEventListener("click", currentLocation);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

search("Portland");
