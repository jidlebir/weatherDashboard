$(document).ready(function(){

    var cacheKey = 'KnownCities' ;
    var cities = JSON.parse(localStorage.getItem(cacheKey));
    var currentDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

    var searchButton = $('#searchBtn');

    searchButton.on('click',function(){
        var searchCity = $('.input').val();
        searchWeather(searchCity);
        displayUVData();
    })

    if (! cities) {
        cities = [];
    }
    else {
        renderHistory(cities);
    }

    function renderHistory(cities) {
        for(var i = 0; i < cities.length; i++){
            newDiv = $('<div>')
            newDiv.text(cities[i])
            $('#History').append(newDiv)
            console.log(citites[i])
        }
    }
    //SEARCH WEATHER FUCNTION
    function searchWeather(city) {
        addNewCity(city);
        fetchWeather(city);
        fetchForecast(city);
    }

    //GET WEATHER DATA WITH API
    function fetchWeather(city) {
        var queryParams =$.param({
            q:city,
            appid: '619e819bc1ce4df35807080adeb1a07d'
        });

        var queryURL = 'https://api.openweathermap.org/data/2.5/weather?' + queryParams

        //AJAX CALL
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        
        .then(function(response){
            fetchUV(res.coord);
            displayWeather(response);
            var cityData = response;
        });        
    }
    
    function displayWeather(cityData) {
        console.log(cityData);

        var currentDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

        varTemp0 = math.round((cityData.main.temp -273.15) * 1.8 +32);

        var iconcode = cityData.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        $('#wicon').attr('src', iconurl);

        $(".cityName").text('Weather for: ' + cityData.name);
        $(".date").text('Date: ' + currentDate);
        $(".temp").text('Temperature: ' + varTemp0);
        $(".wind").text('Wind Speed: ' + cityData.wind.speed);
        $(".humidity").text('Humidity: ' + cityData.main.humidity);

    }

    function fetchUV(coords) {

        var lattitude = coords.lat;
        var longitude = coords.lon;

        var queryParams =$.params({
            lon: coords.lon,
            lat: coords.lat,
            appid: '619e819bc1ce4df35807080adeb1a07d'
        });

        var queryURL = 'https://api.openweathermap.org/data/2.5/uvi?' + queryParams ;

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            displayUVData(response.value)
        });
    };

    function displayUVData(cityData) {
        $(".uv").html('UV Score: ' + cityData);
        if(cityData > 8){
            $('.uv').css("background-color","red");
        }
        else if(cityData < 8 || cityData > 3)
        $('.uv').css("background-color","yellow");
        else{
            $('.uv').css("background-color","green");
        }
    }

    function fetchForecast(city) {
        var queryParams =$.param({
            q:city,
            appid: '619e819bc1ce4df35807080adeb1a07d'
            
        });

        var queryURL ='https://api.openweathermap.org/data/2.5/forecast?' + queryParams
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        })

        .then(function(response){
            displayForecast(response);
        });
    }

    function displayForecast(response) {
        //day1
        var TempF1 = Math.round((response.list[0].main.temp -273.15) * 1.8 +32);
        var newDate1 = moment().add(1,'days').format("MMMM Do");

        var iconcode1 =response.list[0].weather[0].icon;
        var inconurl1 ="http://openweathermap.org/img/w/" + iconcode + ".png";
        $('#wicon1').attr('src', iconurl1);

        $("#date-1").text('Date: ' +newDate1);
        $("#icon-1").text();
        $("#temp-1").text('Temp: ' + TempF1);
        $("#humidity-1").text('Humidity: ' + response.list[0].main.humidity);
        //day2
        var TempF2 = Math.round((response.list[1].main.temp -273.15) * 1.8 +32);
        var newDate2 = moment().add(2,'days').format("MMMM Do");

        var iconcode2 =response.list[1].weather[0].icon;
        var inconurl2 ="http://openweathermap.org/img/w/" + iconcode + ".png";
        $('#wicon2').attr('src', iconurl2);

        $("#date-2").text('Date: ' +newDate2);
        $("#icon-2").text();
        $("#temp-2").text('Temp: ' + TempF2);
        $("#humidity-2").text('Humidity: ' + response.list[1].main.humidity);
        //day3
        var TempF3 = Math.round((response.list[2].main.temp -273.15) * 1.8 +32);
        var newDate3 = moment().add(3,'days').format("MMMM Do");

        var iconcode3 =response.list[2].weather[0].icon;
        var inconurl3 ="http://openweathermap.org/img/w/" + iconcode + ".png";
        $('#wicon3').attr('src', iconurl3);

        $("#date-3").text('Date: ' +newDate3);
        $("#icon-3").text();
        $("#temp-3").text('Temp: ' + TempF3);
        $("#humidity-3").text('Humidity: ' + response.list[2].main.humidity);
        //day4
        var TempF4 = Math.round((response.list[3].main.temp -273.15) * 1.8 +32);
        var newDate4 = moment().add(4,'days').format("MMMM Do");

        var iconcode4 =response.list[3].weather[0].icon;
        var inconurl4 ="http://openweathermap.org/img/w/" + iconcode + ".png";
        $('#wicon4').attr('src', iconurl4);

        $("#date-4").text('Date: ' +newDate4);
        $("#icon-4").text();
        $("#temp-4").text('Temp: ' + TempF4);
        $("#humidity-4").text('Humidity: ' + response.list[3].main.humidity);
        //day5
        var TempF5 = Math.round((response.list[4].main.temp -273.15) * 1.8 +32);
        var newDate5 = moment().add(5,'days').format("MMMM Do");

        var iconcode5 =response.list[4].weather[0].icon;
        var inconurl5 ="http://openweathermap.org/img/w/" + iconcode + ".png";
        $('#wicon5').attr('src', iconurl5);

        $("#date-5").text('Date: ' +newDate5);
        $("#icon-5").text();
        $("#temp-5").text('Temp: ' + TempF5);
        $("#humidity-5").text('Humidity: ' + response.list[4].main.humidity);

    }

    function addNewCity(city) {
        console.log('Add New City')

        if(cities.indexOf(city) === -1) {
            console.log('AddNewCity');

            cities.push(city);

            console.log(cities);

            console.log(cacheKey);

            localStorage.setItem(cacheKey, JSON.stringify(cities))
        }
    }
});