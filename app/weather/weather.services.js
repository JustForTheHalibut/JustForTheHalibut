(function() {
  'use strict';
  angular
    .module('weather')
    .factory('WeatherService', function($http) {

       var getCurrentConditions = function () {
           return $http.get('/api/weather').then(function(currentConditions){
              console.log(currentConditions);
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

       var getHourly = function() {
         return $http.get('api/hourly').then(function(hourly){
           console.log(hourly);
           return {
            //  twelve: hourly.data.hourly_forecast.el.hour
           }
         });
       }

       var getAlerts = function() {
         return $http.get('api/alerts').then(function(alerts){
           console.log(alerts);
           return {

           }
         });
       }

       var getRawTide = function() {
        return $http.get('/api/rawtide').then(function(rawTide){
          console.log(rawTide);
          return {

          }
        });
      };

      return {
        getCurrentConditions: getCurrentConditions,
        getRawTide: getRawTide,
        getHourly: getHourly,
        getAlerts: getAlerts
      };
    });
})();
