document.getElementById('get-weather').onclick = async function() {
  const city = document.getElementById('city-input').value.trim();
  const output = document.getElementById('weather-output');
  if (!city) {
    output.textContent = "Please enter a city name!";
    return;
  }
  output.textContent = "Loading...";
  try {
    const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
    const data = await response.json();

    if (!data.current_condition || data.current_condition.length === 0) {
      output.textContent = "Weather not found!";
      return;
    }
    const weather = data.current_condition[0];
    output.innerHTML = `
      <h3>${city}</h3>
      <p>${weather.temp_C}°C (${weather.weatherDesc[0].value})</p>
      <img src="${weather.weatherIconUrl[0].value}" alt="">
      <p>Humidity: ${weather.humidity}%</p>
      <p>Wind: ${weather.windspeedKmph} km/h</p>
    `;
  } catch (e) {
    output.textContent = "There was an error fetching the weather.";
  }
};