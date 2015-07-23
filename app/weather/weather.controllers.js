(function() {
  'use strict';
  angular
    .module('weather')

    .controller("LineCtrl", function ($scope) {

        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Series A', 'Series B'];
        $scope.data = [
          [65, 59, 80, 81, 56, 55, 40],
          [28, 48, 40, 19, 86, 27, 90]
        ];
      })

    .controller('WeatherController', function($scope, WeatherService, $routeParams){

      WeatherService.getCurrentConditions().then(function (currentConditions) {
        console.log("currentConditions:", currentConditions);
        $scope.currentConditions = currentConditions;
      })

      WeatherService.getAstronomy().then(function (astronomy) {
        console.log("astronomy:", astronomy);
        $scope.astronomy = astronomy;
      })

      WeatherService.getRawTide().then(function (rawtide){
        console.log("rawTide:", rawtide);
        $scope.rawtide = rawtide;
      })

      WeatherService.getHourly().then(function (hourly){
        console.log("hourly:", hourly);
        $scope.hourly = hourly;
      })

      WeatherService.getOneHourly($routeParams.oneHourlyId).then(function (oneHourly) {
       $scope.oneHourly = oneHourly;
     })

      WeatherService.getAlerts().then(function (alerts){
        console.log("alerts", alerts);
        $scope.alerts = alerts;
      })

      WeatherService.getForecast().then(function (forecast){
        console.log("forecast", forecast);
        $scope.forecast = forecast;
      })

      WeatherService.getOneForecast($routeParams.oneForecastId).then(function (oneForecast) {
       $scope.oneForecast = oneForecast;
     });

    });

})();
