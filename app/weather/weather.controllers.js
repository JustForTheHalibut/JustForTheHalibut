(function() {
  'use strict';
  angular
    .module('weather')

    .controller('GeoController', function ($scope,geolocation) {
        geolocation.getLocation().then(function(data){
        $scope.coords = {
          lat:data.coords.latitude,
          long:data.coords.longitude
          };
      });
    })

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

    .controller('WeatherController', function($scope, WeatherService, $routeParams){

      WeatherService.getCurrentConditions("28570").then(function (currentConditions) {
        console.log("currentConditions:", currentConditions);
        $scope.currentConditions = currentConditions;
      })

      WeatherService.getAstronomy().then(function (astronomy) {
        console.log("astronomy:", astronomy);
        $scope.astronomy = astronomy;
      })

      // WeatherService.getRawTide().then(function (rawtide){
      //   console.log("rawTide:", rawtide);
      //   $scope.rawtide = rawtide;
      // })

      WeatherService.getHourly().then(function (hourly){
        console.log("hourly:", hourly);
        $scope.hourly = hourly;
      })
    if($routeParams.oneHourlyId) {
      WeatherService.getOneHourly($routeParams.oneHourlyId).then(function (oneHourly) {
       $scope.oneHourly = oneHourly;
     })
   }

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
