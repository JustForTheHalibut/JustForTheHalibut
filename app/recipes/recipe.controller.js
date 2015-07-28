(function() {
  'use strict';

  angular
    .module('recipes')
    .controller('recipesController', function ($scope, $http, $routeParams, $geolocation, recipesService, Account, $rootScope, $location) {


    if($rootScope.user === undefined){
        Account.getProfile()
          .success(function(data) {
            $scope.user = data;
            $rootScope.user = data;
            console.log($rootScope.user);
          })
    };

    // $scope.getRecipes = function(fishType){
    //   var recipes = recipesService.getRecipes(fishType);
    //   console.log("these are the recipes: ", recipes);
    // }
    var recipes = recipesService.getRecipes('catfish').then(function(data){
      console.log("these are the recipes: ", data);
    });


  });
}());
