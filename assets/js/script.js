
var searchBtn = document.getElementById('search-btn');
var city = document.getElementById('city-text');
var results = document.getElementById('results');
var error = document.getElementById('error');

var todayDate = document.getElementById('today-date');
var tomDate = document.getElementById('tom-date');
var twoDate = document.getElementById('2-date');
var threeDate = document.getElementById('3-date');
var fourDate = document.getElementById('4-date');
var fiveDate = document.getElementById('5-date');

var todayIcon = document.getElementById('today-icon');
var tomIcon = document.getElementById('tom-icon');
var twoIcon = document.getElementById('2-icon');
var threeIcon = document.getElementById('3-icon');
var fourIcon = document.getElementById('4-icon');
var fiveIcon = document.getElementById('5-icon');

var todayTemp = document.getElementById('today-temp');
var tomTemp = document.getElementById('tom-temp');
var twoTemp = document.getElementById('2-temp');
var threeTemp = document.getElementById('3-temp');
var fourTemp = document.getElementById('4-temp');
var fiveTemp = document.getElementById('5-temp');

var todayWind = document.getElementById('today-wind');
var tomWind = document.getElementById('tom-wind');
var twoWind = document.getElementById('2-wind');
var threeWind = document.getElementById('3-wind');
var fourWind = document.getElementById('4-wind');
var fiveWind = document.getElementById('5-wind');

var todayHumid = document.getElementById('today-humid');
var tomHumid = document.getElementById('tom-humid');
var twoHumid = document.getElementById('2-humid');
var threeHumid = document.getElementById('3-humid');
var fourHumid = document.getElementById('4-humid');
var fiveHumid = document.getElementById('5-humid');

var dayOne = moment().add(1, 'days').format('YYYY-MM-DD');
var dayTwo = moment().add(2, 'days').format('YYYY-MM-DD');
var dayThree = moment().add(3, 'days').format('YYYY-MM-DD');
var dayFour = moment().add(4, 'days').format('YYYY-MM-DD');
var dayFive = moment().add(5, 'days').format('YYYY-MM-DD');
var currentHour = moment().format('H')

todayDate.textContent = moment().format('(M/D/YYYY)');
tomDate.textContent = moment().add(1, 'days').format('M/D/YYYY');
twoDate.textContent = moment().add(2, 'days').format('M/D/YYYY');
threeDate.textContent = moment().add(3, 'days').format('M/D/YYYY');
fourDate.textContent = moment().add(4, 'days').format('M/D/YYYY');
fiveDate.textContent = moment().add(5, 'days').format('M/D/YYYY');

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

var tomorrow = dayOne + " " + forecastHour;
var second = dayTwo + " " + forecastHour;
var third = dayThree + " " + forecastHour;
var fourth = dayFour + " " + forecastHour;
var fifth = dayFive + " " + forecastHour;

var cityName;
var lat;
var lon;
var cityBtns = [];


function searchAPI() {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=3037ca1cbca79404f60c919849309523`)
        .then((response) => {
            if (response.status >= 200 && response.status <= 299) {
                storeCity();
                return response.json();
            } else {
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
            lat = response.city.coord.lat;
            lon = response.city.coord.lon;
            restOfAPI();
        });
};

function buttonAPI() {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=3037ca1cbca79404f60c919849309523`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            city.textContent = cityName;
            lat = response.city.coord.lat;
            lon = response.city.coord.lon;
            restOfAPI();
        });
};

function restOfAPI() {
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
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=3037ca1cbca79404f60c919849309523&units=imperial`)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            results.setAttribute('style', 'display');
            for (var i = 0; i < response.list.length; i++) {
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


/* <button type="button" class="history-btn container-fluid btn d-flex justify-content-center my-2"></button>
history */

function storeCity() {
    // Save related form data as an object
    var searchInput = $('#search-input');
    var city = searchInput.val();
    cityBtns.push(city);
    // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
    localStorage.setItem("city", JSON.stringify(cityBtns));
};

function getCities() {
    // Use JSON.parse() to convert text to JavaScript object
    var cities = JSON.parse(localStorage.getItem("city"));

    if (cities !== null) {
        cityBtns = cities;
    }
    renderCities()
};

function renderCities() {

    var history = document.getElementById('city-history');

    history.innerHTML = "";

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

    history.addEventListener("click", function (event) {
        event.preventDefault();
        var element = event.target;

        if (element.matches("button") === true) {
            cityName = element.textContent;
            buttonAPI();
        };
    });
};

function citySearch() {
    var searchInput = $('#search-input');
    cityName = searchInput.val();
    getCities();
    searchAPI();
};

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    citySearch();
    getCities();
});

getCities();