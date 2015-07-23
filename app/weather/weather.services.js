(function() {
  'use strict';
  angular
    .module('weather')
    .factory('WeatherService', function($http) {

       var getCurrentConditions = function () {
           return $http.get('/api/weather').then(function(currentConditions){
              console.log("current conditions", currentConditions);
              return {
                fahrenheit: currentConditions.data.current_observation.temp_f,
                feelsLike: currentConditions.data.current_observation.feelslike_f,
                iconUrl: currentConditions.data.current_observation.icon_url,
                city: currentConditions.data.current_observation.display_location.city,
                description: currentConditions.data.current_observation.weather,
                windGust: currentConditions.data.current_observation.wind_gust_mph,
                windDirection: currentConditions.data.current_observation.wind_dir,
                visability: currentConditions.data.current_observation.visibility_mi,
                humidity: currentConditions.data.current_observation.relative_humidity
              }
          });
         }

         var getAstronomy = function () {
             return $http.get('/api/astronomy').then(function(astronomy){
                console.log("astronomy", astronomy);
                return {
                phaseofMoon: astronomy.data.moon_phase.phaseofMoon,
                sunRiseHour: astronomy.data.sun_phase.sunrise.hour,
                sunRiseMin: astronomy.data.sun_phase.sunrise.hour
                }
            });
           }

      var mapHourlyToUrls = function (collection) {
          return _.map(collection, function (obj) {
          return {
            condition: obj.condition,
            time: obj.FCTTIME.hour,
            iconUrl: obj.icon_url
            };
          });
        }

      var getHourly = function(){
          return $http.get('api/hourly').then(function (hourly) {
            console.log("hourly", hourly)
            var hourlyArr = hourly.data.hourly_forecast;
            return mapHourlyToUrls(hourlyArr);
          });
        }

      var getOneHourly = function (id) {
          return $http.get('api/hourly').then(function (oneHourly) {
            var narrowedDownArr = _.where(oneHourly.data.hourly_forecast);
              return mapHourlyToUrls(narrowedDownArr)[0];
            });
          };

       var getAlerts = function() {
         return $http.get('api/alerts').then(function(alerts){
           console.log("alerts", alerts);
           return {
             alert: alerts.data.alerts.data
           }
         });
       }


       var mapForecastToUrls = function (collection) {
           return _.map(collection, function (obj) {
           return {
             conditions: obj.conditions,
             date: obj.date.pretty,
             weekday: obj.date.weekday,
             iconUrl: obj.icon_url,
             high: obj.high.fahrenheit,
             low: obj.low.fahrenheit

            };
           });
         };

         var getForecast = function(){
             return $http.get('api/forecast').then(function (forecast) {
               console.log("forecast", forecast)
               var forecastArr = forecast.data.forecast.simpleforecast.forecastday;
               return mapForecastToUrls(forecastArr);
             });
           }

          var getOneForecast = function (id) {
              return $http.get('api/forecast').then(function (oneForecast) {
                var narrowedDownArr = _.where(oneForecast.data.forecast.simpleforecast.forecastday);
                  return mapForecastToUrls(narrowedDownArr)[0];
                 });
               };

           var mapRawTideToUrls = function (collection) {
               return _.map(collection, function (obj) {
               return {
                 height: obj.height
                };
               });
             };

           var getRawTide = function(){
               return $http.get('api/rawtide').then(function (rawtide) {
                 console.log("rawTide", rawtide)
                 var rawTideArr = rawtide.data.rawtide.rawTideObs.slice(0,24);
                 return mapRawTideToUrls(rawTideArr);
                 });
               }

      return {
        getCurrentConditions: getCurrentConditions,
        getAstronomy: getAstronomy,
        getRawTide: getRawTide,
        getHourly: getHourly,
        getOneHourly: getOneHourly,
        getAlerts: getAlerts,
        getForecast: getForecast,
        getOneForecast: getOneForecast
      };
    });
})();
