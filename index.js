// Add an event listener to the form with the id 'weatherForm'.
// This listener triggers when the form is submitted.
document.getElementById('weatherForm').addEventListener('submit', function(event) {
  // Prevent the default form submission behavior.
  event.preventDefault();
  // Get the value of the input field with the id 'cityInput'.
  let city = document.getElementById('cityInput').value;
  // Call the fetchWeather function with the city value.
  fetchWeather(city);
});

// Function to fetch weather data from the OpenWeatherMap API.
function fetchWeather(city) {
  // API key for accessing the OpenWeatherMap API.
  const apiKey = 'a772bf1c35dfff9211cc218ea0829e98';
  // Construct the API URL with the provided city and API key.
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Fetch weather data from the API.
  fetch(apiUrl)
    .then(response => response.json()) // Convert the response to JSON format.
    .then(data => {
      // Update the display with the fetched weather data.
      document.querySelector('.cityDisplay').textContent = data.name;
      document.querySelector('.tempDisplay').textContent = `${data.main.temp}°C`;
      document.querySelector('.humidityDisplay').textContent = `Humidity: ${data.main.humidity}%`; 

      // Update the background based on the weather condition.
      updateBackground(data.weather[0].main);
    })
    .catch(error => {
      // Log and alert if there is an error fetching weather data.
      console.error('Error fetching weather data:', error);
      alert('Error fetching weather data. Please try again.');
    });
}

// Function to update the background based on the weather condition.
function updateBackground(weatherCondition) {
  // Get the main display element.
  const mainDisplay = document.getElementById('weatherDisplay');
  // Remove any existing weather classes.
  mainDisplay.classList.remove('sunny', 'cloudy', 'rainy', 'snowy');

  // Switch based on the weather condition and add corresponding class.
  switch(weatherCondition) {
    case 'Clear':
      mainDisplay.classList.add('sunny');
      break;
    case 'Clouds':
      mainDisplay.classList.add('cloudy');
      break;
    case 'Rain':
    case 'Drizzle':
      mainDisplay.classList.add('rainy');
      break;
    case 'Snow':
      mainDisplay.classList.add('snowy');
      break;
    default:
      break;
  }
}
