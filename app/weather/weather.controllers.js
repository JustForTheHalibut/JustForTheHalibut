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
          $scope.onClick = function (points, evt) {
          console.log(points, evt);
        };
      })

    .controller('WeatherController', function($scope, WeatherService){

      var vm = this;

      WeatherService.getCurrentConditions().then(function (currentConditions) {
        console.log(currentConditions);
        vm.currentConditions = currentConditions;
      });

    });

})();
