(function () {
'use strict';

  angular
    .module('maps', [
      'ngRoute',
    ])

    // .config(function(uiGmapGoogleMapApiProvider, $routeProvider) {
    //       uiGmapGoogleMapApiProvider.configure({
    //       key: 'AIzaSyBjn_JnmB5-anlcP2jenrS702gZQ-ck7y8',
    //       v: '3.17',
    //       libraries: 'places,weather,geometry,visualization'
    //   })
    
    .config(function($routeProvider){
      $routeProvider
        .when('/maps', {
          templateUrl: 'maps/views/maps.html',
          controller: 'MapController'
        })
      })
})();
