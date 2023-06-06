// Variáveis e Seleção de elementos
const apiKey = '7ae4298a7b1d7535fe0885fd79f76fc5';
const apiCountryURL = 'https://flagsapi.com/';
const restURL = '/flat/64.png';

const cityInput = document.querySelector("#inputCity");
const searchBtn = document.querySelector("#search");

let content = document.querySelector('.content');
let cityElement = document.querySelector("#city");
let country = document.querySelector("#country");
let temperature = document.querySelector("#temperature span");
let descriptionWeather = document.querySelector("#description");
let weatherIcon = document.querySelector("#weather-icon");
let humidity = document.querySelector("#humidity-icon span");
let wind = document.querySelector("#wind-icon span");
let hide = document.querySelector('.hide');

//Funções
const getWeatherData = async(city) => {
    
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data
}

const showWeatherData = async(city) => {
        
    const data = await getWeatherData(city);
    cityElement.innerText = data.name;
    country.setAttribute('src', `${apiCountryURL}${data.sys.country}${restURL}`);
    temperature.innerText = Math.floor(data.main.temp);
    descriptionWeather.innerText = data.weather[0].description;
    weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    humidity.innerText = data.main.humidity + '%';
    wind.innerText = parseInt(data.wind.speed) + ' km/h';
    content.classList.remove('hide');
    


}

//Eventos
searchBtn.addEventListener('click', (e) =>{
    
    e.preventDefault()

    const city = cityInput.value

    showWeatherData(city)
})

cityInput.addEventListener("keyup", (e) => {
    
    if(e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city);
    }
})

