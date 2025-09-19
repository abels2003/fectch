  async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) return;

    const apiKey = 'a653d04e9b424944ae484554251509'; 
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city},Kerala&aqi=no`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      document.getElementById("weatherCard").classList.remove("d-none");
      document.getElementById("cityName").textContent = data.location.name;
      document.getElementById("temperature").textContent = `${Math.round(data.current.temp_c)}°C`;
      document.getElementById("description").textContent = data.current.condition.text;
      document.getElementById("weatherIcon").src = "https:" + data.current.condition.icon;

      document.getElementById("liveConditionsCard").classList.remove("d-none");
      document.getElementById("windSpeed").textContent = data.current.wind_kph;
      document.getElementById("humidity").textContent = data.current.humidity;
      document.getElementById("feelsLike").textContent = Math.round(data.current.feelslike_c);
      document.getElementById("pressure").textContent = data.current.pressure_mb;
      document.getElementById("visibility").textContent = data.current.vis_km * 1000;

      updateRecentSearches(city);
    } catch (error) {
      console.error('Fetch error:', error);
      alert("Could not fetch weather data. Make sure the city is valid and in Kerala.");
    }
  }

  function updateRecentSearches(city) {
    if (!city) return;
    let searches = JSON.parse(localStorage.getItem("recentSearches")) || [];
    if (!searches.includes(city)) {
      searches.unshift(city);
      if (searches.length > 5) searches.pop();
      localStorage.setItem("recentSearches", JSON.stringify(searches));
    }

    document.getElementById("recentSearches").innerHTML =
      "<strong>Recent:</strong> " + searches.join(", ");
  }
  
  window.onload = () => {
    updateRecentSearches("");
  };
