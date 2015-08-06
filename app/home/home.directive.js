(function () {
  'use strict';
  angular
        .module('MyApp')
        .directive('headerDirective', function () {
          return {
            restrict: 'E',
            templateUrl: 'home/views/header.directive.html',
            transclude: true,
            scope: {
              w: '=',
            }
          };
        });
})();
