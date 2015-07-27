(function() {
  'use strict';
  angular
    .module('weather')

    .controller("LineCtrl", function ($scope, WeatherService) {

        WeatherService.getRawTide().then(function(rawtide){
        console.log("rawtide chart", rawtide)
        var newRawTide = rawtide.map(function (el) {
          return el.height;
        })
        $scope.rawtide = rawtide;
        $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
        $scope.series = ['Series A'];
        $scope.data = [
          newRawTide
          ];
        })
      })

    .controller('WeatherController', function($scope, WeatherService, $routeParams, $geolocation){

      navigator.geolocation.getCurrentPosition(function(position){
          $scope.latitude = position.coords.latitude;
          $scope.longitude = position.coords.longitude;

          WeatherService.getCurrentConditions($scope.latitude, $scope.longitude).then(function(currentConditions) {
            console.log("currentConditions FROM CONTROLLER:", currentConditions);
            $scope.currentConditions = currentConditions;
          })
      })

      WeatherService.getAstronomy().then(function (astronomy) {
        // console.log("astronomy:", astronomy);
        $scope.astronomy = astronomy;
      })

      WeatherService.getRawTide().then(function (rawtide){
        // console.log("rawTide:", rawtide);
        $scope.rawtide = rawtide;
      })

      WeatherService.getHourly().then(function (hourly){
        // console.log("hourly:", hourly);
        $scope.hourly = hourly;
      })

    if($routeParams.oneHourlyId) {
      WeatherService.getOneHourly($routeParams.oneHourlyId).then(function (oneHourly) {
       $scope.oneHourly = oneHourly;
     })
   }

      WeatherService.getAlerts().then(function (alerts){
        // console.log("alerts", alerts);
        $scope.alerts = alerts;
      })

      WeatherService.getTenDayForecast().then(function (tenDayForecast){
        // console.log("tenDayForecast", tenDayForecast);
        $scope.tenDayForecast = tenDayForecast;
      })

      if($routeParams.oneTenDayForecastId) {
      WeatherService.getOneTenDayForecast($routeParams.oneTenDayForecastId).then(function (oneTenDayForecast) {
       $scope.oneTenDayForecast = oneTenDayForecast;
     })
   }

      WeatherService.getForecast().then(function (forecast){
        // console.log("forecast", forecast);
        $scope.forecast = forecast;
      })

      if($routeParams.oneForecastId) {
      WeatherService.getOneForecast($routeParams.oneForecastId).then(function (oneForecast) {
       $scope.oneForecast = oneForecast;
     })
   }

    });

})();
