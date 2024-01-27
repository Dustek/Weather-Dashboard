var userinput = "Jonava"
var lat
var lon

// fetches coordinates from user input
var queryURLcoordinate = "http://api.openweathermap.org/geo/1.0/direct?q="+ userinput + "&limit=5&appid=19bf45fa62f0e7c4bb3694a3eda4303a"
fetch(queryURLcoordinate)
.then(function (response) {
  return response.json();
})
.then(function (data) {
   lat = data[0].lat
   lon = data[0].lon
   getCurrentWeather(lat, lon)
   getFutureWeather(lat, lon)
})


// fetches weather API based on coordinates
function getCurrentWeather(lat, lon) {
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=19bf45fa62f0e7c4bb3694a3eda4303a";
fetch(queryURL)
.then(function (response) {
  return response.json();
})
.then(function (data) {
    console.log(data)
    displayWeatherData(0, $("#today"), data);
});
}

function getFutureWeather(lat, lon) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=19bf45fa62f0e7c4bb3694a3eda4303a";
    fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data)
        for (var i = 7; i < data.list.length; i += 8 ) {
            var dayDiv = $("<div>").addClass("forecast-day");
            displayWeatherData(i, dayDiv, data);
            $("#forecast").append(dayDiv);
        }
    });
    }




    function displayWeatherData (index, displayDiv, data) {
        var temperature = data.list[index].main.temp;
        var humidity = data.list[index].main.humidity;
        var wind = data.list[index].wind.speed
        var date = data.list[index].dt * 1000
        // displays data in correct formats
        var tempDiv = $("<p>").text("temp: " + temperature + "°C")
        var humidityDiv = $("<p>").text("humidity: " + humidity + "%");
        var windDiv = $("<p>").text("wind: " + wind+ " KPH");
        var dateDiv = $("<p>").text("date: " + dayjs(date).format("DD/MM/YYYY"));
        displayDiv.append(tempDiv, humidityDiv, windDiv, dateDiv);

    }







