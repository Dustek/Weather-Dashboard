# Weather Dashboard

## Overview

The purpose of this project is to create Javascript, HTML and CSS code that functions as a weather dashboard, pulling data from an API to display a weather forecast for today and 5 days in the future based on a city name
## Background

The project uses CSS, HTML and Javascript. In particular, this project involved the openWeather API to fetch and display weather data

## Usage

To use the project, simply open the main page (index.html). You can type in a city name and submit, which will bring up the current weather as well as the upcoming 5 day weather data.

## Creation Process

In this project, I first took care of fetching weather API data - first fetching the latitude and longitude from user written input, then fetching the actual weather data. I fetched it in 2 parts - the current day and 5 day forecast. I created a function that displays the relevant data from the fetch JSON and formats it in a readable format.
I then created the form submit functionality that creates divs and displays them on screen when a button is pressed. The fetch input is the user input (city name). The code also creates a search histroy in the form of interactive buttons.
These buttons are saved into local storage and retrieved to remember user inputs from previous usage. Additionally, I created a clear button that clears out the history.

## Acknowledgements

I would like to give credit to my instructor, Abdul, as well as all the TA's and fellow students who have helped me learn how to complete this project.

## Link to website:

https://dustek.github.io/Work-Day-Scheduler/
