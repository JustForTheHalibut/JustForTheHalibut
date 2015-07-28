(function() {
  'use strict';

  angular
    .module('recipes', [
      'ngRoute',
    ])
    .config(function($routeProvider){
      $routeProvider
        .when('/viewRecipes', {
          templateUrl: 'recipes/views/allRecipes.html',
          controller: 'recipesController'
        })
        .when('/viewRecipes/:recipeId', {
          templateUrl: 'recipes/views/detailRecipe.html',
          controller: 'recipesController'
        });

    });

}());
