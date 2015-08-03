(function() {
  'use strict';

  angular
    .module('catch', [
      'ngRoute',
      'ngUpload'
    ])
    .config(function($routeProvider){
      $routeProvider
        .when('/addCatch', {
          templateUrl: 'myCatch/views/addCatch.html',
          controller: 'catchController',
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
        .when('/detail/:catchId', {
          templateUrl: 'myCatch/views/detailCatch.html',
          controller: 'catchController'
        })
        .when('/catchAdded', {
          templateUrl: 'myCatch/views/catchAdded.html',
          controller: 'catchController',
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
        });

    });

}());
