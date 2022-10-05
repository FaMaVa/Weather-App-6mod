
var searchBtn = document.getElementById('search-btn');
var city = document.getElementById('city-text');
var results = document.getElementById('results');

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

// var dayZero = moment().format('YYYY-MM-DD');
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

// var today = dayZero + " " + forecastHour;
var tomorrow = dayOne + " " + forecastHour;
var second = dayTwo + " " + forecastHour;
var third = dayThree + " " + forecastHour;
var fourth = dayFour + " " + forecastHour;
var fifth = dayFive + " " + forecastHour;

searchBtn.addEventListener('click', citySearch);

function citySearch(event) {
    event.preventDefault();
    results.setAttribute('style', 'display');
    var searchInput = $('#search-input');
    var cityName = searchInput.val();
    city.textContent = cityName;
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=3037ca1cbca79404f60c919849309523`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data.city.coord.lat;
            var lon = data.city.coord.lon;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3037ca1cbca79404f60c919849309523&units=imperial`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                todayTemp.textContent = "Temp: " + data.main.temp + " °F";
                todayIcon.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
                todayWind.textContent = "Wind: " + data.wind.speed + " MPH";
                todayHumid.textContent = "Humidity: " + data.main.humidity + " %";
            });
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=3037ca1cbca79404f60c919849309523&units=imperial`)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    for (var i = 0; i < data.list.length; i++) {
                        if (data.list[i].dt_txt == tomorrow) {
                            tomTemp.textContent = "Temp: " + data.list[i].main.temp + " °F";
                            tomIcon.src = "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png";
                            tomWind.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
                            tomHumid.textContent = "Humidity: " + data.list[i].main.humidity + " %";
                        } else if (data.list[i].dt_txt == second) {
                            twoTemp.textContent = "Temp: " + data.list[i].main.temp + " °F";
                            twoIcon.src = "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png";
                            twoWind.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
                            twoHumid.textContent = "Humidity: " + data.list[i].main.humidity + " %";
                        } else if (data.list[i].dt_txt == third) {
                            threeTemp.textContent = "Temp: " + data.list[i].main.temp + " °F";
                            threeIcon.src = "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png";
                            threeWind.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
                            threeHumid.textContent = "Humidity: " + data.list[i].main.humidity + " %";
                        } else if (data.list[i].dt_txt == fourth) {
                            fourTemp.textContent = "Temp: " + data.list[i].main.temp + " °F";
                            fourIcon.src = "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png";
                            fourWind.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
                            fourHumid.textContent = "Humidity: " + data.list[i].main.humidity + " %";
                        } else if (data.list[i].dt_txt == fifth) {
                            fiveTemp.textContent = "Temp: " + data.list[i].main.temp + " °F";
                            fiveIcon.src = "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png";
                            fiveWind.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
                            fiveHumid.textContent = "Humidity: " + data.list[i].main.humidity + " %";
                        };
                    };
                });
        });
};


// list.weather.icon




