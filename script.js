var lat
var lon
// On user input, presents weather data for that city
$("#search-form").on("submit", function(event) {
    event.preventDefault();
    var userinput = $("#search-input").val();
    if (userinput.trim() === "") {
        alert("Please enter a city name");
        return;
    }
    $("#today").empty()
    $("#forecast").empty()
    getWeather(userinput);
// Creates interactive buttons from user input history
    var newButton = $("<button>")
    newButton.addClass("btn btn-primary")
    newButton.text(userinput)
    newButton.on("click", function() {
        $("#today").empty()
        $("#forecast").empty()
        getWeather($(this).text());
    }) 
    $("#history").append(newButton);    

    saveSearchHistory();
    $("#search-input").val("")
    $("#forecast-title").removeClass("hidden");
    $("#city-name").text(userinput)
    $("#city-name").removeClass("hidden");
});

// Saves button history to local storage
function saveSearchHistory() {
    var searchHistory = $("#history").html();
    localStorage.setItem("searchHistory", searchHistory);
    attachEventListeners();
}

// Loads button history on page load
function loadSearchHistory() {
    var searchHistory = localStorage.getItem("searchHistory");
    if (searchHistory) {
        $("#history").html(searchHistory);
        attachEventListeners();
    }
}
loadSearchHistory();


function attachEventListeners() {
    $(".btn-primary").on("click", function() {
        $("#today").empty();
        $("#forecast").empty();
        var cityName = $(this).text();
        getWeather(cityName);
        $("#search-input").val("");
        $("#forecast-title").removeClass("hidden");
        $("#city-name").text(cityName);
        $("#city-name").removeClass("hidden");
    });
}

$("#clear").on("click", function(){
localStorage.clear()
$("#history").empty()
})

// fetches coordinates from user input
function getWeather(userinput) {
var queryURLcoordinate = "https://api.openweathermap.org/geo/1.0/direct?q="+ userinput + "&limit=5&appid=19bf45fa62f0e7c4bb3694a3eda4303a"
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
}

// Fetches and displays current weather
function getCurrentWeather(lat, lon) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=19bf45fa62f0e7c4bb3694a3eda4303a";
    fetch(queryURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data)
            displayWeatherData(0, $("#today"), data);
        })
}

// Fetches and displays 5 day forecast
function getFutureWeather(lat, lon) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=19bf45fa62f0e7c4bb3694a3eda4303a";
    fetch(queryURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            for (var i = 7; i < data.list.length; i += 8) {
                var dayDiv = $("<div>").addClass("forecast-day");
                displayWeatherData(i, dayDiv, data);
                $("#forecast").append(dayDiv);
            }
        })
    }


    function displayWeatherData(index, displayDiv, data) {
        var clouds = data.list[0].clouds.all
        var cloudIcon
        if (clouds < 20) {
            cloudIcon = "☀️";
        } else if (clouds < 50) {
            cloudIcon = "⛅";
        } else {
            cloudIcon = "☁️";
        }
        var temperature = data.list[index].main.temp;
        var humidity = data.list[index].main.humidity;
        var wind = data.list[index].wind.speed;
        var date = data.list[index].dt * 1000;
        var formattedDate = dayjs(date).format("DD/MM/YYYY");
        var dateDiv = $("<p>").addClass("date").text(formattedDate).css("font-weight", "bold");
        var cloudsDiv =$("<p>").text(cloudIcon);
        var tempDiv = $("<p>").text("temp: " + temperature + "°C");
        var humidityDiv = $("<p>").text("humidity: " + humidity + "%");
        var windDiv = $("<p>").text("wind: " + wind + " KPH");
        displayDiv.append(dateDiv, cloudsDiv, tempDiv, humidityDiv, windDiv);
    }
