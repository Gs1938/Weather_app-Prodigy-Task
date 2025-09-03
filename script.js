// Your API Key
const apiKey = "f73d61154e52e2fbc1da8d5d56abce0e";

const weatherDiv = document.getElementById("weather");
const searchBtn = document.getElementById("searchBtn");

// Event listener for search
searchBtn.addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (city) {
    getWeatherByCity(city);
  } else {
    weatherDiv.innerHTML = "<p class='error'>Please enter a city name.</p>";
  }
});

// Fetch weather by city
async function getWeatherByCity(city) {
  weatherDiv.innerHTML = "<p class='loading'>Loading...</p>";
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},in&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found in India!");
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherDiv.innerHTML = `<p class="error">${error.message}</p>`;
  }
}

// Show weather
function displayWeather(data) {
  const celsius = data.main.temp;
  const fahrenheit = (celsius * 9/5 + 32).toFixed(1);
  const updatedTime = new Date(data.dt * 1000).toLocaleTimeString();

  weatherDiv.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
    <p><strong>${data.weather[0].description}</strong></p>
    <p>🌡 Temp: ${celsius} °C / ${fahrenheit} °F</p>
    <p>Feels like: ${data.main.feels_like} °C</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>🌬 Wind: ${data.wind.speed} m/s</p>
    <p>🕒 Last updated: ${updatedTime}</p>
  `;
}
