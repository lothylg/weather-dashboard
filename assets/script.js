//Global variables
const searchBtn = document.getElementById(citySearchBtn);
const cityInput = document.getElementById(citySearchInput);
const recentCities = document.getElementById(recentContainer);
const todaysContainer = document.getElementById(todayContainer);
const fiveDayResults = document.getElementById(returnedWeatherContainer);


//functions

function readLocalStorage(){
    localStorage.getItem('inputCity');
    
}



//calls
