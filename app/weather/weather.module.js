(function() {
  'use strict';
  angular
    .module('weather', [
      'ngRoute',
    ])
    .config(function($routeProvider){
      $routeProvider
        .when('/weather', {
          templateUrl: 'weather/views/main.html',
          controller: 'WeatherController',
          // resolve: {
          //   location: function ($q, $geolocation) {
          //     var dfd = $q.defer();
          //     if(localStorage.getItem('location')) {
          //       dfd.resolve(JSON.parse(localStorage.getItem('location')));
          //     } else {
          //     navigator.geolocation.getCurrentPosition(function(position){
          //
          //       dfd.resolve(position.coords);
          //
          //     });
          //   }
          //     return dfd.promise;
          //   }
          // }
        })
        .when('/weather/hourly', {
          templateUrl: 'weather/views/hourly.html',
          controller: 'WeatherController',
        })
        .when('/weather/tides', {
          templateUrl: 'weather/views/tides.html',
          controller: 'WeatherController',
        });
    });

})();
