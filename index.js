document.getElementById('weatherForm').addEventListener('submit', function(event) {
  event.preventDefault();
  let city = document.getElementById('cityInput').value;
  fetchWeather(city);
});

function fetchWeather(city) {
  const apiKey = 'a772bf1c35dfff9211cc218ea0829e98';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      document.querySelector('.cityDisplay').textContent = data.name;
      document.querySelector('.tempDisplay').textContent = `${data.main.temp}°C`;
      document.querySelector('.humidityDisplay').textContent = `Humidity: ${data.main.humidity}%`;

      updateBackground(data.weather[0].main);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert('Error fetching weather data. Please try again.');
    });
}

function updateBackground(weatherCondition) {
  const mainDisplay = document.getElementById('weatherDisplay');
  mainDisplay.classList.remove('sunny', 'cloudy', 'rainy', 'snowy');

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
