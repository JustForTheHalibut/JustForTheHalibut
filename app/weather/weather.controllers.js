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

    .controller('WeatherController', function($scope, WeatherService, $routeParams, $geolocation){
      // localStorage.setItem('location',JSON.stringify(location))
      // $scope.latitude = location.latitude;
      // $scope.longitude = location.longitude;

      navigator.geolocation.getCurrentPosition(function(position){
        $scope.latitude = position.coords.latitude;
        $scope.longitude = position.coords.longitude;


          WeatherService.getCurrentConditions($scope.latitude, $scope.longitude).then(function(currentConditions) {
            console.log('current', currentConditions);
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


      WeatherService.getTide($scope.latitude, $scope.longitude).then(function(tide){
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
    });

})();
