(function() {
  'use strict';
  angular
    .module('weather')
    .controller('WeatherController', function($scope, WeatherService){

      var vm = this;

      WeatherService.getCurrentConditions().then(function (currentConditions) {
        console.log(currentConditions);
        vm.currentConditions = currentConditions;
      });

    });

})();
