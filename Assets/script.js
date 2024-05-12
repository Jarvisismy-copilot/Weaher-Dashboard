// Open Weather Generated API KEY:
//      4ccd1adf963a131d46a476ba2a672699
const APIkey = "4ccd1adf963a131d46a476ba2a672699";

const searchInput = document.querySelector("#searchInput");
const cityHistory = JSON.parse(localStorage.getItem("History")) || [];
const searchBtn = document.querySelector("#search");

function handleSearchSubmit() {
  const city = searchInput.value.trim();
  if (!city) return;
  searchInput.value=""
  fetchWeather(city);


}
function saveCity(city) {
  if (cityHistory.indexOf(city) === -1) {
    cityHistory.push(city);
    localStorage.setItem("History", JSON.stringify(cityHistory));
    appendToHistory();
  }
}
function appendToHistory() {
  const historyEl = document.querySelector("#history");
  historyEl.innerHTML = "";
  for (let i = cityHistory.length - 1; i >= 0; i--) {
    const btn = document.createElement("button");
    btn.textContent = cityHistory[i];
    btn.classList.add("history");
    historyEl.append(btn);
  }
}

function fetchWeather(city) {
  var apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${APIkey}&q=${city}&units=imperial`;
  fetch(apiUrlWeather)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      saveCity (data.name)
      displayCurrentWeather(data);
      const { lat, lon } = data.coord;
      const apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`;
      fetch(apiUrlForecast)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          displayForecastWeather(data);
        });
    });
}

function displayCurrentWeather(data) {
  document.querySelector("#temp").textContent = `temp: ${Math.round(
    data.main.temp
  )} F`;
  document.querySelector("#name").textContent = `city: ${data.name}`;
  document.querySelector("#date").textContent = `${dayjs
    .unix(data.dt)
    .format("MM/DD/YYYY")}`;
  document.querySelector(
    "#humidity"
  ).textContent = `humidity: ${data.main.humidity} %`;
  document.querySelector("#wind").textContent = `windspeed: ${Math.round(
    data.wind.speed
  )} mph`;

  document.querySelector(
    "#icon"
  ).src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
}

function displayForecastWeather(data) {
  for (let i = 3; i < data.list.length; i += 8) {
    const card = document.createElement("div");
    const date = document.createElement("h3");
    const temp = document.createElement("p");
    const humidity = document.createElement("p");
    const wind = document.createElement("p");
    const icon = document.createElement("img");
    date.textContent = dayjs.unix(data.list[i].dt).format("MM/DD/YYYY");
    temp.textContent = `temp: ${Math.round(data.list[i].main.temp)}`;
    humidity.textContent = `humidity: ${data.list[i].main.humidity}`;
    wind.textContent = `windspeed: ${Math.round(data.list[i].wind.speed)}`;
    icon.src = `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
    card.append(date, icon, temp, humidity, wind);
    document.querySelector("#forecast").append(card);
  }
}
function handleHistoryClick(e){
    if(!e.target.matches(".history"))return
    fetchWeather(e.target.textContent)
}
appendToHistory()

document.querySelector("#history").addEventListener("click",handleHistoryClick)
searchBtn.addEventListener("click", handleSearchSubmit);
