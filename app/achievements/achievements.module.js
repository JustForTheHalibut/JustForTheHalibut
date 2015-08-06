(function() {
  'use strict';
    angular
      .module('achieve', [
      'ngRoute',
    ])
    .config(function($routeProvider){
      $routeProvider
        .when('/achievement', {
          templateUrl: 'achievements/views/achievementsPage.html',
          controller: 'achieveController',
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
}());
