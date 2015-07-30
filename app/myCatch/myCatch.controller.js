(function() {
  'use strict';

  angular
    .module('catch')
    .controller('catchController', function ($scope, $http, $geolocation, recipesService, catchService, Account, $rootScope, $location, Transloadit) {

    if($rootScope.user === undefined){
        Account.getProfile()
          .success(function(data) {
            $scope.user = data;
            $rootScope.user = data;
            console.log($rootScope.user);
            // var user = 'scott';
            // catchService.deleteCatch(user, '55b7a4b540c55d1716593e20');
            // catchService.deleteCatch(user, '55b79e76912935e60faba30b');
            // catchService.deleteCatch(user, '55b78588498eb74ff709fae1');
            // catchService.deleteCatch(user, '55b1a1876386cd3abb4e82f7');
            // catchService.deleteCatch(user, '55b1a0e9c7848f8eba25aa8a');
            // catchService.deleteCatch(user, '55b50103e7d534593f1e0458');
            // catchService.deleteCatch(user, '55b503497d2bccec418b6f57');
            // catchService.deleteCatch(user, '55b5039a8150892b4256cfd0');
            // catchService.deleteCatch(user, '55b503e4a4fa6b7c427ad337');
            // catchService.deleteCatch(user, '55b388446a715d41fc05e210');
            // catchService.deleteCatch(user, '55b3881726119514fc598e2b');
            // catchService.deleteCatch(user, '55b387c279892d3dfb8155b2');
            // catchService.deleteCatch(user, '55b3874f79892d3dfb8155b1');
          })
    }

    if($location.path() === '/addCatch'){
      console.log("we are resetting the form!");
      $scope.catch = defaultCatch;
    }

    if($location.path() === '/catchAdded'){
      var fishType = $scope.catch.kind;
      var test = fishType.split(' ');
      fishType = test.join('');
      console.log("we want recipes for: ", fishType);
      recipesService.getRecipes(fishType).then(function(returned){
        var recipes = returned.data.recipes;
        var fewRecipes = [];
        for (var i = 0; i < 3; i++) { //add a random number generator to pick random recipes
          var next = recipes[i];
          fewRecipes.push(next);
        }
        $scope.recipes = fewRecipes;
        console.log("three: ", $scope.recipes.image_url);

      });
    }

    var defaultCatch= {
        kind: "",
        weight: "",
        length: "",
        location: "",
        tackle: "",
        bait: "",
        image: ""
      }

    $scope.uploadComplete = function (content) {
        $scope.response = JSON.parse(content); // Presumed content is a json string!
        $scope.response.style = {
          color: $scope.response.color,
          "font-weight": "bold"
        };
      }

    navigator.geolocation.getCurrentPosition(function(position){
      $scope.latitude = position.coords.latitude;
      $scope.longitude = position.coords.longitude;
    });


  $scope.submitCatch = function(stuff){
    function getExpiryDate() {
      var date = new Date();
      date.setHours(date.getHours() + 12);

      var year = date.getUTCFullYear();
      var month = zeroFill(date.getUTCMonth() + 1, 2);
      var day = zeroFill(date.getUTCDate(), 2);
      var hours = zeroFill(date.getUTCHours(), 2);
      var minutes = zeroFill(date.getUTCMinutes(), 2);
      var seconds = zeroFill(date.getUTCSeconds(), 2);

      return year + '/' + month + '/' + day + ' ' + hours + ':' + minutes + ':' + seconds + '+00:00';
    }

    function zeroFill(number, width) {
      width -= number.toString().length;
      if (width > 0) {
        return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
      }

      return number + ""; // always return a string
    }

    var file = document.getElementById("my_file").files[0];

    stuff.coord = {
      latitude : $scope.latitude,
      longitude : $scope.longitude
    };
    var now = new moment().format();
    stuff.submitTime = now;

    stuff.displayName = $rootScope.user.displayName.toLowerCase();
    catchService.fishData(stuff);
    $rootScope.catch = stuff;


    Transloadit.upload(file, {
      params: {
        auth: {
          key: 'fc73a980313e11e58e2a1d428cc06c07'
        },
        template_id: '4c370e3035fe11e58282c51c26a58cc0'
     },

      signature: function(callback) {
        // we need to send the expiry date to the server, so that it can generate a correct signature
        return $http.post('/api/signature', {expiry: getExpiryDate() }).success(callback);
        console.log("callback: ", callback)
      },

      progress: function(loaded, total) {
        console.log(loaded + 'bytes loaded');
        console.log(total + ' bytes total');
      },

      processing: function() {
        console.log('done uploading, started processing');
      },

      uploaded: function(assemblyJson) {
        console.log("here it is: ", assemblyJson);
      },

      error: function(error) {
        console.log(error);
      }

    })
  }


  $scope.deleteCatch = function(id){
    var user = $rootScope.user.displayName.toLowerCase();
    catchService.deleteCatch(user, id);
    $location.path("/profile/main");
  }

  $scope.saveRecipe = function(recipe){
    console.log("trying to save recipe");
      var user =  $rootScope.user.displayName;
      var recipe2save= {
        f2f_url : recipe.f2f_url,
        image_url : recipe.image_url,
        recipe_id : recipe.recipe_id,
        title : recipe.title
      }
      console.log("trying to save recipe");
      recipesService.addToFavs(user, recipe2save).then(function(returned){
        console.log("returned");
      })


  };

  var watchCallback = function () {
          catchService.createCatch($rootScope.catch).success(function(data){
            $location.path('/catchAdded');
          });
          };


  $scope.$on('catchImage:added', watchCallback);

  });
}());
