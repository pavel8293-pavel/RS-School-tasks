const currentDate = document.querySelector('.current__date');
const currentQuoteAutor = document.querySelector('blockquote');
const currentQuote = document.querySelector('figcaption');
const quoteButton = document.querySelector('.button__quote');
const currentTime = document.querySelector('.current__time');
const humidity = document.querySelector('.current__humidity');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.current__temperature');
const wind = document.querySelector('.current__wind');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.user__city');

//Date format
function showDate() {
    let today = new Date(),
        localDate = today.getDate(),
        day = today.getDay(),
        month = today.getMonth(),
        year = today.getFullYear();

    function textDay(day) {
        let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        return days[day - 1]
    }
    function textMonth(month) {
        const YearMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        return YearMonths[month]
    }
    currentDate.innerHTML = `${textDay(day)},    ${addZero(localDate)}<span> <span>${textMonth(month)}<span> <span>${addZero(year)}`
    setTimeout(showDate, 60000)
}

//Time format
function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        minutes = today.getMinutes(),
        seconds = today.getSeconds();
    currentTime.innerHTML = `${addZero(hour)}<span>:<span>${addZero(minutes)}<span>:<span>${addZero(seconds)}`
    setTimeout(showTime, 1000)
}
// Transform 1 number value 1h => 01h
addZero = (number) => (parseInt(number, 10) < 10 ? '0' : '') + number;

//Get quotes from API
async function getQuote() {
    const url = `https://favqs.com/api/qotd`;
    const result = await fetch(url);
    const data = await result.json()
    currentQuoteAutor.textContent = data.quote.author;
    currentQuote.textContent = data.quote.body;
}

//Get weather from API
async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=efc70d7484357bd98a43122ba9518f9f&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.coord && city.textContent) {
        localStorage.setItem('city', city.textContent);
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `Temperature:  ${data.main.temp}°C`;
        humidity.textContent = `Humidity:   ${data.main.humidity}%`;
        wind.textContent = `Wind:    ${data.wind.speed} m/s`;
        weatherDescription.textContent = data.weather[0].description;
    } else {
        city.textContent = localStorage.getItem('city')
    }
}

function cleanCity() {
    city.textContent = '';
}

//Set city
function setCity(e) {
    if (e.type === "keypress") {
        if (e.keyCode == 13) {
            getWeather();
            city.blur()
        }
    } else {
        getWeather();
    }
}

city.addEventListener('blur', setCity);
city.addEventListener('keypress', setCity);
city.addEventListener('click', cleanCity);
quoteButton.addEventListener('click', getQuote);
document.addEventListener('DOMContentLoaded', getQuote);
document.addEventListener('DOMContentLoaded', getWeather);
showDate()
showTime()
getWeather()

