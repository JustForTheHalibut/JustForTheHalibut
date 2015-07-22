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

    .controller('WeatherController', function($scope, WeatherService){

      WeatherService.getCurrentConditions().then(function (currentConditions) {
        console.log(currentConditions);
        $scope.currentConditions = currentConditions;
     });

     WeatherService.getRawTide().then(function (rawTide){
       console.log(rawTide);
       $scope.rawTide = rawTide;
     });

     WeatherService.getHourly().then(function (hourly){
       console.log(hourly);
       $scope.hourly = hourly;
     });

     WeatherService.getAlerts().then(function (alerts){
       console.log(alerts);
       $scope.alerts = alerts;
     });

    });

})();
