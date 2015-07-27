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
            // console.log("currentConditions FROM CONTROLLER:", currentConditions);
            $scope.currentConditions = currentConditions;
          })

          WeatherService.getAstronomy($scope.latitude, $scope.longitude).then(function (astronomy) {
            // console.log("astronomy from CONTROLLER:", astronomy);
            $scope.astronomy = astronomy;
          })

          WeatherService.getHourly($scope.latitude, $scope.longitude).then(function (hourly){
            console.log("hourly from CONTROLLER:", hourly);
            $scope.hourly = hourly;
          })

          if($routeParams.oneHourlyId) {
            WeatherService.getOneHourly($routeParams.oneHourlyId, $scope.latitude, $scope.longitude).then(function (oneHourly) {
             $scope.oneHourly = oneHourly;
           })
         }

         WeatherService.getForecast($scope.latitude, $scope.longitude).then(function (forecast){
           console.log("forecast from CONTROLLER", forecast);
           $scope.forecast = forecast;
         })

         if($routeParams.oneForecastId) {
         WeatherService.getOneForecast($routeParams.oneForecastId, $scope.latitude, $scope.longitude).then(function (oneForecast) {
          $scope.oneForecast = oneForecast;
        })
      }

        WeatherService.getTenDayForecast($scope.latitude, $scope.longitude).then(function (tenDayForecast){
          console.log("tenDayForecast from CONTROLLER", tenDayForecast);
          $scope.tenDayForecast = tenDayForecast;
        })

        if($routeParams.oneTenDayForecastId) {
        WeatherService.getOneTenDayForecast($routeParams.oneTenDayForecastId, $scope.latitude, $scope.longitude).then(function (oneTenDayForecast) {
         $scope.oneTenDayForecast = oneTenDayForecast;
       })
      }

        WeatherService.getAlerts($scope.latitude, $scope.longitude).then(function (alerts){
          console.log("alerts from CONTROLLER", alerts);
          $scope.alerts = alerts;
        })
    })


      WeatherService.getRawTide().then(function (rawtide){
        // console.log("rawTide:", rawtide);
        $scope.rawtide = rawtide;
      })



    });

})();
