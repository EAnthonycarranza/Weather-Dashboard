# Weather Dashboard

This is a weather dashboard application that allows users to see the weather for multiple cities. Users can search for a city and view the current and future weather conditions for that city such as wind speed, temperature and humidity. The searched city is added to the search history, which can be used to revisit the weather data for that city.

## Features

The Weather Dashboard includes the following features:

- Current Weather: Displays the current weather conditions for the searched city, including the city name, date, weather icon, temperature, humidity, and wind speed.
- 5-Day Forecast: Provides a forecast for the next five days, showing the date, weather icon, temperature, humidity, and wind speed for each day.
- Random City: Allows the user to search for a random city to view the forecast.
- Search History: Keeps track of the previously searched cities and allows users to click on a city in the search history to view its current and future weather conditions.
- Responsive Design: The dashboard is responsive and adapts to different screen sizes, providing a great viewing experience on different kinds of devices.

## Live Demo

You can try out the live demo of the Weather Dashboard [here!](https://eanthonycarranza.github.io/Weather-Dashboard/).

## Screenshot

![Weather Dashboard Screenshot](./Assets/Screenshot%20Capture%20-%202023-05-25%20-%2018-06-49.png)

## Usage

1. Enter a City: In the search input field, enter the name of the city for which you want to view the weather conditions.
2. Submit the Form: Click the "Search" button or press Enter to submit the form and fetch the weather data for the entered city.
3. View Current Weather: The current weather conditions for the searched city will be displayed, including the city name, date, weather icon, temperature, humidity, and wind speed.
4. View 5-Day Forecast: The forecast for the next five days will be shown, displaying the date, weather icon, temperature, humidity, and wind speed for each day.
5. Search History: The searched city is added to the search history. You can click on a city in the search history to view its current and future weather conditions again.

## Technologies Used

- HTML
- CSS
- JavaScript

## Installation

To use the Weather Dashboard locally, follow these steps:

1. Clone the repository:
git clone https://github.com/EAnthonycarranza/Weather-Dashboard.git
2. Navigate to the project directory:
cd weather-dashboard
3. Open the `index.html` file in a web browser.

## API Key

This application uses the OpenWeatherMap API to fetch weather data. You need to provide an API key to fetch the data successfully. Obtain an API key by creating an account on the [OpenWeatherMap website](https://openweathermap.org/) and following the API documentation.
In this case, the API is already provided in the JavaScript code itself.

Once you have obtained an API key, replace the `apiKey` variable in the `script.js` file with your API key.

```javascript
const apiKey = 'your-api-key';
