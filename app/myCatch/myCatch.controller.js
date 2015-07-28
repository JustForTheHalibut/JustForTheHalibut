(function() {
  'use strict';

  angular
    .module('catch')
    .controller('catchController', function ($scope,$http, $geolocation, recipesService, catchService, Account, $rootScope, $location, Transloadit) {

    if($rootScope.user === undefined){
        Account.getProfile()
          .success(function(data) {
            $scope.user = data;
            $rootScope.user = data;
            console.log($rootScope.user);
            // var user = 'Ginger';
            // catchService.deleteCatch(user, '55b3cfaf9c2b1192286e704f');
            // catchService.deleteCatch(user, '55b3cfaf9c2b1192286e704f');
            // catchService.deleteCatch(user, '55b26faaec5596d4cd9a1a7c');
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



    // $scope.submitCatch = function(input){
    //   console.log("this is what we need to submit: ", input);
    //
    //   var $el = $('#upload-form');
    //     $el.transloadit({
    //       wait: true
    //   });
    //   var uploader = $el.data('transloadit.uploader');
    //   console.log("Files: ", uploader);
    // };

    navigator.geolocation.getCurrentPosition(function(position){
      $scope.latitude = position.coords.latitude;
      $scope.longitude = position.coords.longitude;
    });

  $scope.submitCatch = function(file) {
      file.coord = {
        latitude : $scope.latitude,
        longitude : $scope.longitude
      };
      var now = new moment().format();
      file.submitTime = now;
      console.log("this is the time: ", file.submitTime);

      file.displayName = $rootScope.user.displayName.toLowerCase();
      console.log("displayName: ", file.displayName);
      catchService.fishData(file);
      catchService.createCatch(file).success(function(data){
        $location.path('/catchAdded');
      });





    // Transloadit.upload(file, {
    //   params: {
    //     auth: {
    //       key: 'fc73a980313e11e58e2a1d428cc06c07'
    //     },
    //
    //     steps: {
    //      //Resizes the uploaded image to 100x100 px
    //      resize_to_100: {
    //        robot: "/image/resize",
    //        use: ":original",
    //        width: 100,
    //        height: 100,
    //        debug: true
    //      },
    //    }
    //  },
    //
    //   signature: function(callback) {
    //     // ideally you would be generating this on the fly somewhere
    //     $http.get('/api/signature').success(callback);
    //   },
    //
    //   progress: function(loaded, total) {
    //     console.log(loaded + 'bytes loaded');
    //     console.log(total + ' bytes total');
    //   },
    //
    //   processing: function() {
    //     console.log('done uploading, started processing');
    //   },
    //
    //   uploaded: function(assemblyJson) {
    //     console.log(assemblyJson);
    //   },
    //
    //   error: function(error) {
    //     console.log(error);
    //   }
    //
    //
    // });
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



  });
}());
