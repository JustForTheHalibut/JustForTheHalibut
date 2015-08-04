(function() {
  'use strict';
  angular
    .module('achievements', [
      'ngRoute',
    ])
    .config(function($routeProvider){
      $routeProvider
        .when('/profile/achievements', {
          templateUrl: 'achievements/views/main.html',
          controller: 'WeatherController',
          resolve: {
              authenticated: function($q, $location, $auth) {
                var deferred = $q.defer();

                if (!$auth.isAuthenticated()) {
                  $location.path('/login');
                } else {
                  deferred.resolve();
                }

                return deferred.promise;
              }
          }
        })
    });

})();
