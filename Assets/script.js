// Open Weather Generated API KEY:
//      4ccd1adf963a131d46a476ba2a672699
const APIkey = "4ccd1adf963a131d46a476ba2a672699"


const searchInput = document.querySelector ("#searchInput")

const searchBtn = document.querySelector ("#search")

function handleSearchSubmit () {
    const city = searchInput.value.trim ()
    if (!city) return
    fetchWeather (city)
}
function fetchWeather (city) {
    var apiUrlWeather = `https://api.openweathermap.org/data/2.5/weather?appid=${APIkey}&q=${city}&units=imperial`;
fetch (apiUrlWeather)   .then (res=>res.json()).then(data=> {
    console.log (data)
    displayCurrentWeather(data)
    const{lat,lon} = data.coord 
    const apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIkey}`;
    fetch (apiUrlForecast) .then (res=>res.json()).then(data=>{console.log (data)})
})
}

function displayCurrentWeather (data) {
document.querySelector ("#temp") .textContent = `temp; ${data.main.temp} F`
document.querySelector ("#name") .textContent = `city; ${data.name}`
document.querySelector ("#date") .textContent = `${dayjs.unix(data.dt).format("MM/DD/YYYY")}`
document.querySelector ("#humidity") .textContent = `humidity; ${data.main.humidity} %`
document.querySelector ("#wind") .textContent = `windspeed; ${data.wind.speed} mph`

document.querySelector ("#icon") .src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`

}


searchBtn.addEventListener ("click", handleSearchSubmit)