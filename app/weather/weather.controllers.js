(function() {
  'use strict';
  angular
    .module('weather')

    .controller('WeatherController', function($scope, WeatherService, $routeParams, $geolocation){

      navigator.geolocation.getCurrentPosition(function(position){
          $scope.latitude = position.coords.latitude;
          $scope.longitude = position.coords.longitude;

          WeatherService.getCurrentConditions($scope.latitude, $scope.longitude).then(function(currentConditions) {
            $scope.currentConditions = currentConditions;
          })

          WeatherService.getAstronomy($scope.latitude, $scope.longitude).then(function (astronomy) {
            $scope.astronomy = astronomy;
          })

          WeatherService.getHourly($scope.latitude, $scope.longitude).then(function (hourly){
            $scope.hourly = hourly;
          })

          if($routeParams.oneHourlyId) {
            WeatherService.getOneHourly($routeParams.oneHourlyId, $scope.latitude, $scope.longitude).then(function (oneHourly) {
             $scope.oneHourly = oneHourly;
           })
         }

         WeatherService.getForecast($scope.latitude, $scope.longitude).then(function (forecast){
           $scope.forecast = forecast;
         })

         if($routeParams.oneForecastId) {
         WeatherService.getOneForecast($routeParams.oneForecastId, $scope.latitude, $scope.longitude).then(function (oneForecast) {
          $scope.oneForecast = oneForecast;
        })
      }

        WeatherService.getTenDayForecast($scope.latitude, $scope.longitude).then(function (tenDayForecast){
          $scope.tenDayForecast = tenDayForecast;
        })

        if($routeParams.oneTenDayForecastId) {
        WeatherService.getOneTenDayForecast($routeParams.oneTenDayForecastId, $scope.latitude, $scope.longitude).then(function (oneTenDayForecast) {
         $scope.oneTenDayForecast = oneTenDayForecast;
       })
      }

        WeatherService.getAlerts($scope.latitude, $scope.longitude).then(function (alerts){
          $scope.alerts = alerts;
        })
    })

      WeatherService.getTide().then(function(tide){
      console.log("tide chart", tide)
      var newTide = tide.map(function (el) {
        return el.height;
      })
      $scope.tide = tide;
      $scope.labels = ['high','nothing','low','high','nothing','low'];
      $scope.series = ['Series A'];
      $scope.data = [
        newTide
        ];
      })

    });

})();
