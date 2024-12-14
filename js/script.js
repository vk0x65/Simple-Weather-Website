async function fetchWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=b49a357d2a5c4e02862152442241112&q=${city}&days=3`
    );

    if (response.ok && response.status !== 400) {
      const weatherData = await response.json();
      displayCurrentWeather(weatherData.location, weatherData.current);
      displayForecastWeather(weatherData.forecast.forecastday);
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

document.getElementById("search").addEventListener("keyup", (event) => {
  fetchWeatherData(event.target.value);
});

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function displayCurrentWeather(location, currentWeather) {
  if (currentWeather) {
    const lastUpdatedDate = new Date(currentWeather.last_updated.replace(" ", "T"));

    const currentWeatherHTML = `<div class="today forecast">
      <div class="forecast-header" id="today">
        <div class="day">${daysOfWeek[lastUpdatedDate.getDay()]}</div>
        <div class="date">${lastUpdatedDate.getDate()} ${monthNames[lastUpdatedDate.getMonth()]}</div>
      </div>
      <div class="forecast-content" id="current">
        <div class="location">${location.name}</div>
        <div class="degree">
          <div class="num">${currentWeather.temp_c}<sup>o</sup>C</div>
          <div class="forecast-icon">
            <img src="https:${currentWeather.condition.icon}" alt="" width="90">
          </div>
        </div>
        <div class="custom">${currentWeather.condition.text}</div>
        <span><img src="images/icon-umberella.png" alt="">20%</span>
        <span><img src="images/icon-wind.png" alt="">18km/h</span>
        <span><img src="images/icon-compass.png" alt="">East</span>
      </div>
    </div>`;

    document.getElementById("forecast").innerHTML = currentWeatherHTML;
  }
}

function displayForecastWeather(forecastDays) {
  let forecastHTML = "";

  for (let i = 1; i < forecastDays.length; i++) {
    const forecastDate = new Date(forecastDays[i].date.replace(" ", "T"));
    forecastHTML += `<div class="forecast">
      <div class="forecast-header">
        <div class="day">${daysOfWeek[forecastDate.getDay()]}</div>
      </div>
      <div class="forecast-content">
        <div class="forecast-icon">
          <img src="https:${forecastDays[i].day.condition.icon}" alt="" width="48">
        </div>
        <div class="degree">${forecastDays[i].day.maxtemp_c}<sup>o</sup>C</div>
        <small>${forecastDays[i].day.mintemp_c}<sup>o</sup></small>
        <div class="custom">${forecastDays[i].day.condition.text}</div>
      </div>
    </div>`;
  }

  document.getElementById("forecast").innerHTML += forecastHTML;
}

fetchWeatherData("Cairo");

(function($, document, window){
	$(document).ready(function(){
		$(".mobile-navigation").append($(".main-navigation .menu").clone());
		$(".menu-toggle").click(function(){
			$(".mobile-navigation").slideToggle();
		});
		var map = $(".map");
		var latitude = map.data("latitude");
		var longitude = map.data("longitude");
		if( map.length ){
			map.gmap3({
				map:{
					options:{
						center: [latitude,longitude],
						zoom: 15,
						scrollwheel: false
					}
				},
				marker:{
					latLng: [latitude,longitude],
				}
			});
			
		}
	});
	$(window).load(function(){
	});
})(jQuery, document, window);