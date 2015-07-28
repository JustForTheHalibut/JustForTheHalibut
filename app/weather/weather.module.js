(function() {
  'use strict';
  angular
    .module('weather', [
      'ngRoute',
    ])
    .config(function($routeProvider){
      $routeProvider
        .when('/weather', {
          templateUrl: 'weather/views/main.html',
          controller: 'WeatherController',
        })
        .when('/weather/hourly', {
          templateUrl: 'weather/views/hourly.html',
          controller: 'WeatherController',
        })
        .when('/weather/tenday', {
          templateUrl: 'weather/views/tenday.html',
          controller: 'WeatherController',
        });
    });

})();
