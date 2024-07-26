//Global variables
const searchBtn = document.getElementById('citySearchBtn');
let cityInput = document.getElementById('citySearchInput');
const recentCities = document.getElementById('recentContainer');
const todaysContainer = document.getElementById('todayContainer');
const dayOne = document.getElementById('dayOne');
const dayTWo = document.getElementById('dayTwo');
const dayThree = document.getElementById('dayThree');
const dayFour = document.getElementById('dayFour');
const dayFive = document.getElementById('dayFive');
const oldSearchBtn = document.getElementById('pastSearched')

//event listeners
searchBtn.addEventListener('click', handleFetchOnSubmit)

function start(){
    const recentCitiesSearched = JSON.parse(localStorage.getItem("cityHistory")) || []; //parsing allows you to use the array. localStorage.getItem alone just returns a string

    if (recentCitiesSearched.length === 0){
        const cityInputVal = "New York"
        getGeoFromApi(cityInputVal)
    }else {
        // just take the first one in the array and go from there. 
        const cityInputVal = recentCitiesSearched[0]
        getGeoFromApi(cityInputVal);
        cityBtnCreate();
    }
}
//function fetch city history and make buttons
function cityBtnCreate(){
    const cityHistory = JSON.parse(localStorage.getItem("cityHistory"))
    console.log(cityHistory)
    recentCities.innerHTML= "";

    cityHistory.forEach(city => {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button type="button" class="recentCity btn btn-primary col-lg-12 m-2 p-1"> ${city} </button>
        `;
        recentCities.appendChild(btnDiv)
    })
}
start();

function handleFetchOnSubmit(event){
  event.preventDefault();
  const cityInputVal = cityInput.value;
  if(cityInput.value===''){
    alert ('Please choose a city')
  } else {
    getGeoFromApi(cityInputVal)
    cityInput.value = "";
  }
}

async function getGeoFromApi(cityInputVal){
    let locQueryUrl ='https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=9dda7082c6c5f74991b6bd06c0ed0db0';
    const queryString = `https://api.openweathermap.org/geo/1.0/direct?q=${cityInputVal}&appid=9dda7082c6c5f74991b6bd06c0ed0db0`;

    fetch(queryString)
        .then(function(response){
            if(!response.ok) {
                throw Error(`response status: ${response.status}`)
            }
            return response.json();
        })
        .then(function(data){
            console.log(data)
            const dataObj = data
            const lat = dataObj[0].lat;
            const lon = dataObj[0].lon;
            console.log(lat)
            console.log(lon)
            getWeatherFromGeo(lat, lon)
        })
    .catch(function(error){
        alert ('city not found, please check spelling');
        console.log(error)
    });
    
}

function getWeatherFromGeo(lat, lon){
    const weatherFromGeo = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=9dda7082c6c5f74991b6bd06c0ed0db0`;

    fetch(weatherFromGeo)
    .then(function(response){
        if(!response.ok) {
            throw Error(`response status: ${response.status}`)
        }
        return response.json();
    })
    .then(function(data){
        const cityInput = data.city.name;
        console.log(data)
        populateWeather(data);
    })

    .catch(function(error){
        alert ('cannot return weather');
        console.log(error)
        console.log("getWeatherFromGeo error")
    });
}

function populateWeather(data){
    //Today's weather
    $("#todayContainer").empty()
    $("#returnedWeatherContainer").empty()
    const cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];
    const cityName = data.city.name;
    const tempD1 = data.list[0].main.temp;
    const dateD1 = data.list[0].dt_txt.split(' ')[0];
    const humidityD1 = data.list[0].main.humidity;
    const iconD1 = data.list[0].weather[0].icon;
    const windD1 = data.list[0].wind.speed;

    const todayFeature = $(`
                            <h3 id="todayFirstLine">${cityName} (${dateD1})  <img src="https://openweathermap.org/img/wn/${iconD1}@2x.png"></h3> 
                            <p id="todayTemp">Temp: ${tempD1}° F</p>
                            <p id="todayWind">Wind: ${windD1} MPH</p>
                            <p id="todayHumidity">Humidity: ${humidityD1}%</p>            
                        `)

    $("#todayContainer").append(todayFeature);

    for ( let i = 0; i<data.list.length; i = i+8 ){
        const currentDay = data.list[i];

        const fiveDay = $(`
            <div class="col-md-3 text-white m-2 p-2" style="width: 180px; height: 320px; background-color: rgba(20, 7, 58, 0.909);" id="dayThreeContainer">
            <h3 class="text-white"> ${currentDay.dt_txt.split(' ')[0]}</h3>
            <img src="https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png">
            <p class="text-white"> Temp: ${currentDay.main.temp} °F </p>
            <p class="text-white">Wind: ${currentDay.wind.speed} MPH</p>
            <p class="text-white">Humidity: ${currentDay.main.humidity}%</p> 
            </div>`)

            $("#returnedWeatherContainer").append(fiveDay)

    }
    if(!cityHistory.includes(cityName) ){
        cityHistory.push(cityName);
        localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
        cityBtnCreate()
        makeClickable()
    } else {
        localStorage.setItem("cityHistory", JSON.stringify(cityHistory))
        cityBtnCreate()
        makeClickable()
    }
}
function makeClickable(){
let buttons = document.querySelectorAll('.recentCity')
buttons.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            event.preventDefault();
            const cityInputVal = btn.innerHTML;
            getGeoFromApi(cityInputVal)
        })
    })
}

//clear out the parts
        // dayOneDate.innerHTML = "";
        // dayTwoDate.innerHTML = "";
        // dayThreeDate.innerHTML = "";
        // dayFourDate.innerHTML = "";
        // dayFiveDate.innerHTML = "";
        // dayOneIcon.innerHTML = "";
        // dayTwoIcon.innerHTML = "";
        // dayThreeIcon.innerHTML = "";
        // dayFourIcon.innerHTML = "";
        // dayFiveIcon.innerHTML = "";
        // dayOneTemp.innerHTML = "";
        // dayTwoTemp.innerHTML = "";
        // dayThreeTemp.innerHTML = "";
        // dayFourTemp.innerHTML = "";
        // dayFiveTemp.innerHTML = "";
        // dayOneWind.innerHTML = "";
        // dayTwoWind.innerHTML = "";
        // dayThreeWind.innerHTML = "";
        // dayFourWind.innerHTML = "";
        // dayFiveWind.innerHTML = "";
        // dayOneHumidity.innerHTML = "";
        // dayTwoHumidity.innerHTML = "";
        // dayThreeHumidity.innerHTML = "";
        // dayFourHumidity.innerHTML = "";
        // dayFiveHumidity.innerHTML = "";
        // todayFirstLine.innerHTML = "";
        // todayTemp.innerHTML = "";
        // todayWind.innerHTML = "";
        // todayHumidity.innerHTML = "";

//         const newdiv = $("<div>")

//         data.list.filter( (day, idx) => idx % 8 === 0 ).map( day => $(`"
// <div class="col-md-3 text-white m-2 p-2" style="width: 180px; height: 320px; background-color: rgba(20, 7, 58, 0.909);" id="dayThreeContainer">
//     <h3 class="text-white" id="dayThreeDate"> </h3>
//     <p class="text-white" id="dayThreeIcon">${currentDay.weather.icon}</p>
//     <p class="text-white" id="dayThreeTemp"></p>
//     <p class="text-white" id="dayThreeWind"></p>
//     <p class="text-white" id="dayThreeHumidity">${currentDay.humidity}</p>
// </div>"`

// //put data in a variable
//         const tempD1 = data.list[0].main.temp;
//         const humidityD1 = data.list[0].main.humidity;
//         const iconD1 = data.list[0].weather.icon;
//         const windD1 = data.list[0].wind.speed;
//         const dateD1 = data.list[0].dt_txt.split(' ')[0];
//         const tempD2 = data.list[8].main.temp;
//         const humidityD2 = data.list[8].main.humidity;
//         const iconD2 = data.list[8].weather.icon;
//         const windD2 = data.list[8].wind.speed;
//         const dateD2 = data.list[8].dt_txt.split(' ')[0];
//         const tempD3 = data.list[17].main.temp;
//         const humidityD3 = data.list[17].main.humidity;
//         const iconD3 = data.list[17].weather.icon;
//         const windD3 = data.list[17].wind.speed;
//         const dateD3 = data.list[17].dt_txt.split(' ')[0];
//         const tempD4 = data.list[25].main.temp;
//         const humidityD4 = data.list[25].main.humidity;
//         const iconD4 = data.list[25].weather.icon;
//         const windD4 = data.list[25].wind.speed;
//         const dateD4 = data.list[25].dt_txt.split(' ')[0];
//         const tempD5 = data.list[33].main.temp;
//         const humidityD5 = data.list[33].main.humidity;
//         const iconD5 = data.list[33].weather.icon;
//         const windD5 = data.list[33].wind.speed;
//         const dateD5 = data.list[33].dt_txt.split(' ')[0];
// //put variable in the parts
//         dayOneDate.innerHTML = `${dateD1}`;
//         dayTwoDate.innerHTML = `${dateD2}`;
//         dayThreeDate.innerHTML = `${dateD3}`;
//         dayFourDate.innerHTML = `${dateD4}`;
//         dayFiveDate.innerHTML = `${dateD5}`;
//         dayOneIcon.innerHTML = `${iconD1}`;
//         dayTwoIcon.innerHTML = `${iconD2}`;
//         dayThreeIcon.innerHTML = `${iconD3}`;
//         dayFourIcon.innerHTML = `${iconD4}`;
//         dayFiveIcon.innerHTML = `${iconD5}`;
//         dayOneTemp.innerHTML = `Temp: ${tempD1} °F`;
//         dayTwoTemp.innerHTML = `Temp: ${tempD2} °F`;
//         dayThreeTemp.innerHTML = `Temp: ${tempD3} °F`;
//         dayFourTemp.innerHTML = `Temp: ${tempD4} °F`;
//         dayFiveTemp.innerHTML = `Temp: ${tempD5} °F`;
//         dayOneWind.innerHTML = `Wind: ${windD1} MPH`;
//         dayTwoWind.innerHTML = `Wind: ${windD2} MPH`;
//         dayThreeWind.innerHTML = `Wind: ${windD3} MPH`;
//         dayFourWind.innerHTML = `Wind: ${windD4} MPH`;
//         dayFiveWind.innerHTML = `Wind: ${windD5} MPH`;
//         dayOneHumidity.innerHTML = `Humidity: ${humidityD1}%`;
//         dayTwoHumidity.innerHTML = `Humidity: ${humidityD2}%`;
//         dayThreeHumidity.innerHTML = `Humidity: ${humidityD3}%`;
//         dayFourHumidity.innerHTML = `Humidity: ${humidityD4}%`;
//         dayFiveHumidity.innerHTML = `Humidity: ${humidityD5}%`;
//         todayFirstLine.innerHTML = `${cityInput.value} (${dateD1}) <img src="<img src="https://openweathermap.org/img/wn/${iconD1}@2x.png">`;
//         todayTemp.innerHTML = `Temp: ${tempD1} °F`;
//         todayWind.innerHTML = `Wind: ${windD1} MPH`;
//         todayHumidity.innerHTML = `Humidity: ${humidityD1}%`;

// }

// //put city search in local storage
// function addSearchToHistory(){
//     const citiesSearched = localStorage.getItem("citiesSearched") || [];
//     const city = citiesSearched ? JSON.parse(citiesSearched) : [];
//     const btnContainer = getElementById('recentContainer');

//     if (cities !== null){}
//     localStorage.setItem("citiesSearched", JSON.stringify(citiesSearched))

//     for ( i = 0; i <citiesSearched.length; i++){
//         const cityBtn = createElement('button'()
//         const cityBtn = $("<button type="button" class="btn btn-primary col-lg-12 m-2 p-1" id="pastSearched"></button>").textContent(${cityInput.value});
//         btnContainer.append(cityBtn);
//     }

// }

// oldSearchBtn.addEventListener("click", function(event){
//     event.preventDefault();
//     document.getElementById('pastSearched').val(event.target.textContent);
//     cityInput=pastSearched.value;
//     getGeoFromApi(event);
// })


