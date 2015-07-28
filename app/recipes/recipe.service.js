(function() {
  'use strict';

  angular
    .module('recipes')
    .factory('recipesService', function($http, $rootScope, $routeParams) {


      var getRecipes = function(fish) {
        return $http.get('/api/recipes/' + fish).then(function(recipes){
          return recipes;
        })
      }


      return {
        getRecipes: getRecipes
      };

    });
})();
