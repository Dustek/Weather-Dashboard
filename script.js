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
   useCoordinates(lat, lon)
})


// fetches weather API based on coordinates
function useCoordinates(lat, lon) {
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=19bf45fa62f0e7c4bb3694a3eda4303a";
fetch(queryURL)
.then(function (response) {
  return response.json();
})
.then(function (data) {
    console.log(data)
    var temperature = data.list[0].main.temp;
    var humidity = data.list[0].main.humidity;
    var wind = data.list[0].main.wind.speed
    var date = data.list[0].dt


})}
