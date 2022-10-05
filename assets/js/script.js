//Setting DOM elements to variables
var searchBtn = document.getElementById('search-btn');
var city = document.getElementById('city-text');
var results = document.getElementById('results');
var error = document.getElementById('error');

//Displaying the dates for each day
var todayDate = document.getElementById('today-date');
var tomDate = document.getElementById('tom-date');
var twoDate = document.getElementById('2-date');
var threeDate = document.getElementById('3-date');
var fourDate = document.getElementById('4-date');
var fiveDate = document.getElementById('5-date');

//Displaying the weather icon for each day
var todayIcon = document.getElementById('today-icon');
var tomIcon = document.getElementById('tom-icon');
var twoIcon = document.getElementById('2-icon');
var threeIcon = document.getElementById('3-icon');
var fourIcon = document.getElementById('4-icon');
var fiveIcon = document.getElementById('5-icon');

//Displaying the temperature for each day
var todayTemp = document.getElementById('today-temp');
var tomTemp = document.getElementById('tom-temp');
var twoTemp = document.getElementById('2-temp');
var threeTemp = document.getElementById('3-temp');
var fourTemp = document.getElementById('4-temp');
var fiveTemp = document.getElementById('5-temp');

//Displaying the wind speed for each day
var todayWind = document.getElementById('today-wind');
var tomWind = document.getElementById('tom-wind');
var twoWind = document.getElementById('2-wind');
var threeWind = document.getElementById('3-wind');
var fourWind = document.getElementById('4-wind');
var fiveWind = document.getElementById('5-wind');

//Displaying the humidity for each day
var todayHumid = document.getElementById('today-humid');
var tomHumid = document.getElementById('tom-humid');
var twoHumid = document.getElementById('2-humid');
var threeHumid = document.getElementById('3-humid');
var fourHumid = document.getElementById('4-humid');
var fiveHumid = document.getElementById('5-humid');

//Creating global variables to use in API fetch and when saving search history to local storage.
var cityName;
var lat;
var lon;
var cityBtns = [];

//Using moment.js to get the dates to display on the UI
todayDate.textContent = moment().format('(M/D/YYYY)');
tomDate.textContent = moment().add(1, 'days').format('M/D/YYYY');
twoDate.textContent = moment().add(2, 'days').format('M/D/YYYY');
threeDate.textContent = moment().add(3, 'days').format('M/D/YYYY');
fourDate.textContent = moment().add(4, 'days').format('M/D/YYYY');
fiveDate.textContent = moment().add(5, 'days').format('M/D/YYYY');

//Using moment.js to get the future dates to use to extract forecast information from API.
var dayOne = moment().add(1, 'days').format('YYYY-MM-DD');
var dayTwo = moment().add(2, 'days').format('YYYY-MM-DD');
var dayThree = moment().add(3, 'days').format('YYYY-MM-DD');
var dayFour = moment().add(4, 'days').format('YYYY-MM-DD');
var dayFive = moment().add(5, 'days').format('YYYY-MM-DD');

//Since the API gives forecast info in 3-hour increments, this will gather which 3-hr window we are in to extract data from API.
var currentHour = moment().format('H')

if (currentHour >= 0 && currentHour < 3) {
    forecastHour = "00:00:00";
} else if (currentHour >= 3 && currentHour < 6) {
    forecastHour = "03:00:00";
} else if (currentHour >= 6 && currentHour < 9) {
    forecastHour = "06:00:00";
} else if (currentHour >= 9 && currentHour < 12) {
    forecastHour = "09:00:00";
} else if (currentHour >= 12 && currentHour < 15) {
    forecastHour = "12:00:00";
} else if (currentHour >= 15 && currentHour < 18) {
    forecastHour = "15:00:00";
} else if (currentHour >= 18 && currentHour < 21) {
    forecastHour = "18:00:00";
} else if (currentHour >= 21 && currentHour < 24) {
    forecastHour = "21:00:00";
};

//Setting a variable for forcast date and time to extract data from API.
var tomorrow = dayOne + " " + forecastHour;
var second = dayTwo + " " + forecastHour;
var third = dayThree + " " + forecastHour;
var fourth = dayFour + " " + forecastHour;
var fifth = dayFive + " " + forecastHour;


//When searching a city the API fetch will start here. 
//This function has an error message if a city name is not entered and will only save to local storage if a city name is entered.
function searchAPI() {
    //Gathering the latitude and longitude of city seached
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=3037ca1cbca79404f60c919849309523`)
        .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                //Calling the function to save to local storage
                storeCity();
                return response.json();
            } else {
                //Displays error message
                results.setAttribute('style', 'display:none')
                error.setAttribute("style", "display");
                setTimeout(function () {
                    error.setAttribute("style", "display:none");
                }, 3000);
                return;
            }
        })
        .then(function (response) {
            city.textContent = cityName;
            //Setting global lat and lon variables
            lat = response.city.coord.lat;
            lon = response.city.coord.lon;
            //Runs the rest of the API fetching
            restOfAPI();
        });
};

//When clicking a seach history button the API fetch will start here.
function buttonAPI() {
    //Gathering the latitude and longitude of city clicked
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=3037ca1cbca79404f60c919849309523`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            city.textContent = cityName;
            //Setting global lat and lon variables
            lat = response.city.coord.lat;
            lon = response.city.coord.lon;
            //Runs the rest of the API fetching
            restOfAPI();
        });
};

//The rest of the API fetch function
function restOfAPI() {
    //Gathering todays weather data with latitude and longitude
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3037ca1cbca79404f60c919849309523&units=imperial`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
            todayTemp.textContent = "Temp: " + response.main.temp + " °F";
            todayIcon.src = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
            todayWind.textContent = "Wind: " + response.wind.speed + " MPH";
            todayHumid.textContent = "Humidity: " + response.main.humidity + " %";
        });
    //Gathering the 5-day waether forcast's data with latitude and longitude
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=3037ca1cbca79404f60c919849309523&units=imperial`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            results.setAttribute('style', 'display');
            for (var i = 0; i < response.list.length; i++) {
                //Displaying API data to forecast using the date and time variables set earlier to extract
                if (response.list[i].dt_txt == tomorrow) {
                    tomTemp.textContent = "Temp: " + response.list[i].main.temp + " °F";
                    tomIcon.src = "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png";
                    tomWind.textContent = "Wind: " + response.list[i].wind.speed + " MPH";
                    tomHumid.textContent = "Humidity: " + response.list[i].main.humidity + " %";
                } else if (response.list[i].dt_txt == second) {
                    twoTemp.textContent = "Temp: " + response.list[i].main.temp + " °F";
                    twoIcon.src = "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png";
                    twoWind.textContent = "Wind: " + response.list[i].wind.speed + " MPH";
                    twoHumid.textContent = "Humidity: " + response.list[i].main.humidity + " %";
                } else if (response.list[i].dt_txt == third) {
                    threeTemp.textContent = "Temp: " + response.list[i].main.temp + " °F";
                    threeIcon.src = "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png";
                    threeWind.textContent = "Wind: " + response.list[i].wind.speed + " MPH";
                    threeHumid.textContent = "Humidity: " + response.list[i].main.humidity + " %";
                } else if (response.list[i].dt_txt == fourth) {
                    fourTemp.textContent = "Temp: " + response.list[i].main.temp + " °F";
                    fourIcon.src = "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png";
                    fourWind.textContent = "Wind: " + response.list[i].wind.speed + " MPH";
                    fourHumid.textContent = "Humidity: " + response.list[i].main.humidity + " %";
                } else if (response.list[i].dt_txt == fifth) {
                    fiveTemp.textContent = "Temp: " + response.list[i].main.temp + " °F";
                    fiveIcon.src = "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png";
                    fiveWind.textContent = "Wind: " + response.list[i].wind.speed + " MPH";
                    fiveHumid.textContent = "Humidity: " + response.list[i].main.humidity + " %";
                };
            };
        });
};

// Function to store city name entered as an object in local storage
function storeCity() {
    var searchInput = $('#search-input');
    var city = searchInput.val();
    cityBtns.push(city);
    // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
    localStorage.setItem("city", JSON.stringify(cityBtns));
};

// Gathering city history from local storage
function getCities() {
    // Use JSON.parse() to convert text to JavaScript object
    var cities = JSON.parse(localStorage.getItem("city"));

    if (cities !== null) {
        cityBtns = cities;
    }
    //Calling function to render the data from local storage
    renderCities()
};

//Rendering search history from local data to the UI
function renderCities() {
    var history = document.getElementById('city-history');

    //Clearing out search history to keep from having repeating buttons
    history.innerHTML = "";

    //Creating search history buttons
    for (var i = 0; i < cityBtns.length; i++) {
        var city = cityBtns[i];
        var li = document.createElement("li");

        li.setAttribute("data-index", i);

        var button = document.createElement("button");
        button.textContent = city;
        button.setAttribute("class", "history-btn container-fluid btn d-flex justify-content-center my-2");
        button.setAttribute("type", "button");

        li.appendChild(button);
        history.appendChild(li);
    };

    //Adding event listeners to buttons to fetch API when clicked
    history.addEventListener("click", function (event) {
        event.preventDefault();
        var element = event.target;

        if (element.matches("button") === true) {
            cityName = element.textContent;
            //Calls button API to render the city's forecast
            buttonAPI();
        };
    });
};

//Initializing the search when the "Search" button is clicked
function citySearch() {
    var searchInput = $('#search-input');
    cityName = searchInput.val();
    getCities();
    searchAPI();
};

//Adding event listener to search button
searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    citySearch();
    //Calling function to gets and display local storage
    getCities();
});

//Calling function to gets and display local storage when page starts
getCities();