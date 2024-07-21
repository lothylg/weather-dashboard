//Global variables
const searchBtn = document.getElementById(citySearchBtn);
let cityInput = document.getElementById(citySearchInput);
const recentCities = document.getElementById(recentContainer);
const todaysContainer = document.getElementById(todayContainer);
const fiveDayResults = document.getElementById(returnedWeatherContainer);
const cityInputVal = cityInput.value;

//event listeners
searchBtn.addEventListener('click', handleFetchOnSubmit) 

//functions

function handleFetchOnSubmit(event){
  event.preventDefault();
  if(cityInput.value===''){
    alert ('Please choose a city')
  } else {
    getLocationFromApi()
  }
}

const cityCoord = function getLocationFromApi(){
    let locQueryUrl ='http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=9dda7082c6c5f74991b6bd06c0ed0db0';

    
    
}





//todo: read from local storage

function readLocalStorage(){
    localStorage.getItem('inputCity');

}
//todo parse from local storage

//take input and start process

//create 5 day forecast cards

//api to get name of city desired and convert to lat/long

//api to get weather from lat / long





//calls

