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
          controller: 'catchController'
        })
        .when('/catchAdded', {
          templateUrl: 'myCatch/views/catchAdded.html',
          controller: 'catchController'
        });

    });

}());
