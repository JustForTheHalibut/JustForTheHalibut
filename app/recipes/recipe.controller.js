(function() {
  'use strict';

  angular
    .module('recipes')
    .controller('recipesController', function ($scope, $http, $routeParams, $geolocation, recipesService, Account, $rootScope, $location, $window ) {


    if($rootScope.user === undefined){
        Account.getProfile()
          .success(function(data) {
            $scope.user = data;
            $rootScope.user = data;
            console.log($rootScope.user);
          });
    };

      recipesService.getFromFavs($rootScope.user.displayName).then(function(data){
        console.log("these are the favorites: ", data);
        $scope.Favorites = data.data;
      });

      recipesService.recipeDetails($routeParams.recipeId).then(function (recipe) {
        $scope.recipe = recipe.data.recipe;
        var ingredients = $scope.recipe.ingredients;
        ingredients = _.uniq(ingredients);
        $scope.recipe.ingredients = ingredients;
        console.log("routeParams: ", $scope.recipe);
      });



    $scope.getRecipes = function(fishType){
      var recipes = recipesService.getRecipes(fishType).then(function(returned){
        var allRecipes = returned.data.recipes;
        $scope.recipes = allRecipes;
      });

    }

    $scope.saveRecipe = function(id){
        var user =  $rootScope.user.displayName;
        var recipe2save= {
          f2f_url : $scope.recipe.f2f_url,
          image_url : $scope.recipe.image_url,
          recipe_id : id,
          title : $scope.recipe.title
        }
        recipesService.addToFavs(user, recipe2save).then(function(returned){
          console.log("returned");
        })


    };

    $scope.deleteRecipe = function(id){
      var user =  $rootScope.user.displayName;
      recipesService.deleteFromFavs(user, id);

    }

    $scope.goBack = function(){
      $window.history.back();
    }




  });
}());
