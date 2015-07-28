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

      var recipeDetails = function(rId) {
        return $http.get('/api/recipeDetails/' + rId).then(function(details){
          return details;
        })
      }

      var getFromFavs = function(user){
        var name = user.toLowerCase();
        return $http.get('api/collections/Recipes' + name);
      }

      var addToFavs= function(user, obj) {
        var name = user.toLowerCase();
        console.log("name: ", name);
        console.log("this is what we will post: ", obj);
        return $http.post('api/collections/Recipes' + name,  obj).success(function (response) {
              $rootScope.$broadcast('recipes:saved');
              console.log(response);
            }).error(function (err) {
              console.log(err);
            });
      }

      var deleteFromFavs= function(user, recipeId) {
        var name = user.toLowerCase();
        $http.delete('api/collections/Recipes' + name + '/' + recipeId).then(function(res) {
          $rootScope.$broadcast('recipe:deleted');
          console.log("it has been done...");
        });
      }



      return {
        getRecipes: getRecipes,
        recipeDetails: recipeDetails,
        addToFavs : addToFavs,
        deleteFromFavs : deleteFromFavs,
        getFromFavs : getFromFavs
      };

    });
})();
