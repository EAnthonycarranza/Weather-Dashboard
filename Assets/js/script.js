const apiKey = '5610cd72a1888ccebaab814c9599c0e1';
const searchForm = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const searchHistory = document.getElementById('search-history');
const currentWeatherContainer = document.getElementById('current-weather');
const forecastContainer = document.getElementById('forecast');
const searchButton = document.getElementById('search-button');
const randomCityBtn = document.getElementById('randomCityBtn');

// List of cities for the random city generator
let cities = [
  "New York", "London", "Berlin", "Tokyo", "Paris", "Sydney", 
  "Rio de Janeiro", "Moscow", "Rome", "Dubai", "Beijing", 
  "Cairo", "Cape Town", "Chicago", "Delhi", "Hong Kong", 
  "Istanbul", "Jerusalem", "Las Vegas", "Los Angeles", "Madrid", 
  "Melbourne", "Mexico City", "Miami", "Munich", "Nairobi", 
  "Osaka", "Ottawa", "Saint Petersburg", "San Francisco", 
  "Santiago", "São Paulo", "Shanghai", "Singapore", "Toronto", 
  "Vancouver", "Vienna", "Washington, D.C.", "Zurich", "Athens", 
  "Amsterdam", "Edinburgh", "Manchester", "Cardiff", "Stockholm", 
  "Helsinki", "Oslo", "Copenhagen", "Lisbon", "Buenos Aires", 
  "Brasília", "Montevideo", "Lima", "Quito", "Bogotá", 
  "Kingston", "Havana", "Algiers", "Accra", "Nouakchott", 
  "Dakar", "Lagos", "Nairobi", "Addis Ababa", "Cape Town", 
  "Johannesburg", "Windhoek", "Libreville", "Yaounde", "Kinshasa", 
  "Luanda", "Maputo", "Antananarivo", "Port Louis", "Victoria", 
  "Jakarta", "Kuala Lumpur", "Bangkok", "Hanoi", "Manila", 
  "Dhaka", "Karachi", "Colombo", "Mumbai", "Kolkata", 
  "Chennai", "Bangalore", "Hyderabad", "Pune", "Ahmedabad", 
  "Kathmandu", "Thimphu", "Male", "Colombo", "Seoul", 
  "Taipei", "Ulaanbaatar", "Hanoi", "Vientiane", "Phnom Penh", 
  "Canberra", "Wellington", "Suva", "Nuku'alofa", "Port Moresby", 
  "Honolulu"
];

// Get weather data when search button is clicked
searchButton.addEventListener('click', function() {
  getWeatherData(cityInput.value);
  window.setTimeout(function(){
    window.location = '#top';
  }, 0);
});

// Fetch weather for a random city when the Random City button is clicked
randomCityBtn.addEventListener('click', function() {
  let randomCity = cities[Math.floor(Math.random() * cities.length)];
  cityInput.value = randomCity;
  getWeatherData(randomCity);
  window.setTimeout(function(){
    window.location = '#top';
  }, 0);
});


// Function to get weather data
function getWeatherData(city) {
}

// Function to generate a random city
function randomCity() {
  return cities[Math.floor(Math.random() * cities.length)];
}

// Initialize an empty array to store the search history
// This is empty initially and will be updated as the user searches for cities
const searchHistoryList = [];

// Attach an event listener to the search form to handle form submissions
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city !== '') {
    getWeatherData(city);
    cityInput.value = '';
  }
});

// Attach an event listener to the search history element to handle clicks on previous searches
searchHistory.addEventListener('click', function (event) {
  const city = event.target.innerText;
  getWeatherData(city);
    // Scroll to the top of the page
    window.location.href = "#top";
});

// Function to fetch weather data from the OpenWeatherMap API
function getWeatherData(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        alert('City not found. Please try again.');
        return;
      }
      // If city is found, format and store the weather data
      const weather = {
        city: data.name,
        date: new Date().toLocaleDateString(),
        icon: data.weather[0].icon,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed
      };
      displayCurrentWeather(weather);
      addCityToSearchHistory(weather.city);
      return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
    })
    .then(response => response.json())
    .then(data => {
      // Group forecast data by date and store it in a format that can be used by the display function
      const groupedForecast = data.list.reduce((acc, item) => {
        const date = item.dt_txt.split(' ')[0];
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(item);
        return acc;
      }, {});

      // Convert the grouped forecast data into a list that can be used to generate HTML
      const forecast = Object.values(groupedForecast).map(items => {
        const item = items[0];
        return {
          date: item.dt_txt.split(' ')[0],
          icon: item.weather[0].icon,
          temperature: item.main.temp,
          humidity: item.main.humidity,
          windSpeed: dataToMPH(item.wind.speed)
        };
      });

      displayForecast(forecast);
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    });
}

// Function to display the current weather data on the webpage
function displayCurrentWeather(weather) {
  const temperatureCelsius = weather.temperature.toFixed(1);
  const temperatureFahrenheit = celsiusToFahrenheit(weather.temperature).toFixed(1);

  const weatherHTML = `
    <div class="weather-card">
      <h3>${weather.city}</h3>
      <p>${weather.date}</p>
      <img src="https://openweathermap.org/img/wn/${weather.icon}.png" alt="Weather Icon">
      <p class="temp">${temperatureCelsius}°C / ${temperatureFahrenheit}°F</p>
      <p class="humidity">Humidity: ${weather.humidity}%</p>
      <p class="wind-speed">Wind Speed: ${weather.windSpeed} MPH</p>
    </div>
  `;
  currentWeatherContainer.innerHTML = weatherHTML;
}

// Function to display the forecast data on the webpage
function displayForecast(forecast) {
  let forecastHTML = '';

  forecast.forEach(item => {
    const temperatureCelsius = item.temperature.toFixed(1);
    const temperatureFahrenheit = celsiusToFahrenheit(item.temperature).toFixed(1);

    forecastHTML += `
      <div class="weather-card">
        <h3>${item.date}</h3>
        <img src="https://openweathermap.org/img/wn/${item.icon}.png" alt="Weather Icon">
        <p class="temp">${temperatureCelsius}°C / ${temperatureFahrenheit}°F</p>
        <p class="humidity">Humidity: ${item.humidity}%</p>
        <p class="wind-speed">Wind Speed: ${item.windSpeed} MPH</p>
      </div>
    `;
  });

  forecastContainer.innerHTML = forecastHTML;
}

// Function to add a city to the search history and update the display
function addCityToSearchHistory(city) {
  // Check if the city already exists in the search history list
  const existingIndex = searchHistoryList.indexOf(city);
  
  // If the city exists in the list, remove it from its current position
  if (existingIndex !== -1) {
    searchHistoryList.splice(existingIndex, 1);
  }
  
  // Add the city to the beginning of the search history list
  searchHistoryList.unshift(city);
  
  // Limit the search history list to 5 items
  searchHistoryList.splice(5);
  
  // Generate HTML for the search history and update the display
  searchHistory.innerHTML = searchHistoryList.map(item => `<li>${item}</li>`).join('');
}



// Functions to convert temperature from Celsius to Fahrenheit and wind speed from m/s to MPH
function celsiusToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

function dataToMPH(speed) {
  return (speed * 0.621371).toFixed(1);
}

// Function to update the current time on the webpage
function updateTimer() {
  const timerElement = document.getElementById('timer');
  const currentDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);
  timerElement.textContent = formattedDate;
}

// Add an event listener to the button that triggers when it's clicked
searchButton.addEventListener('click', function(event) {
  setTimeout(function() {
      // Scroll the window to the top of the page
      // Here, I'm using setTimeout to delay the scroll action
      // I'm using 0 to run the code as soon as the stack is clear
      window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
      });
  }, 0);
});


// Update the timer every second
setInterval(updateTimer, 1000);
