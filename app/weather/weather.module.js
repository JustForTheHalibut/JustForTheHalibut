(function() {
  'use strict';
  angular
    .module('weather', [
      'ngRoute',
    ])
    .config(function($routeProvider){
      $routeProvider
        .when('/weather', {
          templateUrl: 'weather/views/main.html'
        });
    });

})();
