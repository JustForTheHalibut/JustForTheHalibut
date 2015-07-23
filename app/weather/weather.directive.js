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
        })
        .directive('alertsDirective', function () {
          return {
            restrict: 'E',
            templateUrl: 'weather/views/alerts.directive.html',
            transclude: true,
            scope: {
              a: '=',
            }
          };
        })
        .directive('hourlyDirective', function () {
          return {
            restrict: 'E',
            templateUrl: 'weather/views/hourly.directive.html',
            transclude: true,
            scope: {
              h: '=',
            }
          };
        })
        .directive('forecastDirective', function () {
          return {
            restrict: 'E',
            templateUrl: 'weather/views/forecast.directive.html',
            transclude: true,
            scope: {
              f: '=',
            }
          };
        });
})();
