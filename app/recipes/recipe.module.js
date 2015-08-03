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
          controller: 'recipesController',
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
        .when('/viewRecipes/:recipeId', {
          templateUrl: 'recipes/views/detailRecipe.html',
          controller: 'recipesController'
        });

    });

}());
