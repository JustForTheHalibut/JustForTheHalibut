(function () {
  'use strict';
  angular
        .module('weather')
        .directive('weatherDirective', function () {
          return {
            restrict: 'E',
            templateUrl: 'weather/views/weather.directive.html',
            transclude: true,
            scope: {
              w: '=',
            }
          };
        });
})();
