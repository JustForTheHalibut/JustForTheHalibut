(function() {
  'use strict';
  angular
    .module('weather')

    .controller('TabsController', function ($scope) {

      $scope.tabs = [
        { title:'Dynamic Title 1', content:'Dynamic content 1' },
        { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
  ];

    })

    .controller('WeatherController', function($scope, $rootScope, WeatherService, $routeParams, $geolocation, $window){
      // localStorage.setItem('location',JSON.stringify(location))
      // $scope.latitude = location.latitude;
      // $scope.longitude = location.longitude;
      if($rootScope.latitude === undefined && $rootScope.longitude === undefined){
        navigator.geolocation.getCurrentPosition(function(position){
          $rootScope.latitude = position.coords.latitude;
          $rootScope.longitude = position.coords.longitude;
          console.log("weather setting root scope coords");
        });
      }

          WeatherService.getCurrentConditions($rootScope.latitude, $rootScope.longitude).then(function(currentConditions) {
            console.log('current', currentConditions);
            $scope.currentConditions = currentConditions;
          })

          WeatherService.getAstronomy($rootScope.latitude, $rootScope.longitude).then(function (astronomy) {
            $scope.astronomy = astronomy;
          })

          WeatherService.getHourly($rootScope.latitude, $rootScope.longitude).then(function (hourly){
            $scope.hourly = hourly;
          })

          if($routeParams.oneHourlyId) {
            WeatherService.getOneHourly($routeParams.oneHourlyId, $rootScope.latitude, $rootScope.longitude).then(function (oneHourly) {
             $scope.oneHourly = oneHourly;
           })
         }

         WeatherService.getForecast($rootScope.latitude, $rootScope.longitude).then(function (forecast){
           $scope.forecast = forecast;
         })

         if($routeParams.oneForecastId) {
         WeatherService.getOneForecast($routeParams.oneForecastId, $rootScope.latitude, $rootScope.longitude).then(function (oneForecast) {
          $scope.oneForecast = oneForecast;
        })
      }

        WeatherService.getTenDayForecast($rootScope.latitude, $rootScope.longitude).then(function (tenDayForecast){
          $scope.tenDayForecast = tenDayForecast;
        })

        if($routeParams.oneTenDayForecastId) {
        WeatherService.getOneTenDayForecast($routeParams.oneTenDayForecastId, $rootScope.latitude, $rootScope.longitude).then(function (oneTenDayForecast) {
         $scope.oneTenDayForecast = oneTenDayForecast;
       })
      }

        WeatherService.getAlerts($rootScope.latitude, $rootScope.longitude).then(function (alerts){
          $scope.alerts = alerts;
        })

        $scope.goBack = function(){
          $window.history.back();
        }

      WeatherService.getTide($rootScope.latitude, $rootScope.longitude).then(function(tide){
      console.log("tide chart from CONTROLLER", tide);
      var newTide = tide.filter(function (el) {
        return el.type === "High Tide" || el.type === "Low Tide";
      }).map(function(el) {
        return parseFloat(el.height.replace(/ft/ig,"").trim());
      })

      var newLabel = tide.filter(function (el) {
        return el.type === "High Tide" || el.type === "Low Tide"
      }).map(function(el) {
        return moment.unix(+el.epoch).format("MM/DD h:mm a");
      });
      console.log(newLabel);
      $scope.tide = tide;

      $scope.data = [newTide];
      $scope.labels = newLabel;
      })

    });

})();
