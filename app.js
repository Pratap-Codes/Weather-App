const apiKey = 'cbbc4a7bdb9df06f7409b640005180be'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric'
const searchCity = document.querySelector('#search-city');
const submitBtn = document.querySelector('#submit-btn');

async function checkWeather(city) {
    if (!city) return alert('Please enter the city name');

    const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`)
    let data = await response.json()
    console.log(data)

    if(data.cod === '404'){
       return alert('City not found');
    }


    document.querySelector('#city').innerHTML = data.name
    document.querySelector('#city-temp').innerHTML = Math.floor(data.main.temp) + `° C`;

    let cityTime = new Date((data.dt + data.timezone) * 1000);

    let hours = cityTime.getUTCHours();
    let minutes = cityTime.getUTCMinutes();

    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    const formatTime = `${hours.toString().padStart(2, '0')}:` +
        `${minutes.toString().padStart(2, '0')} ${ampm}`

    document.querySelector('#time-result').innerHTML = formatTime


    const humidity = data.main.humidity;
    document.querySelector('#humidity-result').innerHTML = humidity + `%`;

    const windSpeed = data.wind.speed;
    document.querySelector('#wind-result').innerHTML = windSpeed + ` mph`;

    const weatherConditions = data.weather[0].description
        ;
    document.querySelector('#weather-conditions').innerHTML = weatherConditions;

    // document.querySelector('#uv-result').innerHTML = 

}

submitBtn.addEventListener('click', () => {
    checkWeather(searchCity.value.trim());

})

searchCity.value = "Kathmandu"; // optional: show in input
checkWeather(searchCity.value);