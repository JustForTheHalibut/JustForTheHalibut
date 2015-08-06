(function() {
  'use strict';

  angular
    .module('catch')
    .controller('catchController', function ($scope, $http, $geolocation, $routeParams, recipesService, catchService, Account, $rootScope, $location, $window, Transloadit) {

    if($rootScope.user === undefined){
        Account.getProfile()
          .success(function(data) {
            $scope.user = data;
            $rootScope.user = data;
            // var user = 'scott';
            // catchService.deleteCatch(user, '55ba79b0bfc8df62e06bd45f');
          })
    }
    else{
      catchService.getAllCatch($rootScope.user.displayName).then(function(data){
        $rootScope.fish = data.data;
        if($rootScope.fish.length !== $rootScope.user.fishCaught){
          $rootScope.user.fishCaught = $rootScope.fish.length;
        }
        if($rootScope.fish.length === 0){
          $rootScope.user.points = 0;
          $rootScope.user.species = [];
          Account.updateProfile($rootScope.user);
          console.log("user: ", $rootScope.user);
        }
      });
    }


    catchService.getCatch($rootScope.user.displayName, $routeParams.catchId).then(function (aCatch) {
        console.log("this is what we need to display: ", aCatch);
        $scope.aCatch = aCatch.data;
        if($scope.aCatch === ""){
          catchService.getCatch($rootScope.someUser, $routeParams.catchId). then(function(aCatch){
            $scope.aCatch = aCatch.data;
          });
        }
      });

    if($location.path() === '/addCatch'){
      $scope.catch = defaultCatch;
    }



    if($location.path() === '/catchAdded'){
      var fishType = $scope.catch.kind;
      var test = fishType.split(' ');
      fishType = test.join('');
      recipesService.getRecipes(fishType).then(function(returned){
        var recipes = returned.data.recipes;
        var fewRecipes = [];
        var one =   Math.floor(Math.random() * (recipes.length - 0));
        var two =   Math.floor(Math.random() * (recipes.length - 0));
        if(one === two){
          var two =   Math.floor(Math.random() * (recipes.length - 0));
        }
        var three =   Math.floor(Math.random() * (recipes.length - 0));
        if(three === one || three === two){
          var three =   Math.floor(Math.random() * (recipes.length - 0));
        }
        console.log("numbers: ", one, two, three);
        // for (var i = 0; i < 3; i++) { //add a random number generator to pick random recipes
        //   var next = recipes[i];
        //   fewRecipes.push(next);
        // }
        fewRecipes.push(recipes[one]);
        fewRecipes.push(recipes[two]);
        fewRecipes.push(recipes[three]);
        console.log("few Recipes: ", fewRecipes);

        $scope.recipes = fewRecipes;
        $scope.recipes[0].class = 'class1';
        $scope.recipes[0].class2 = 'class2';
        $scope.recipes[1].class = 'class3';
        $scope.recipes[1].class2 = 'class4';
        $scope.recipes[2].class = 'class5';
        $scope.recipes[2].class2 = 'class6';
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
      $rootScope.latitude = position.coords.latitude;
      $rootScope.longitude = position.coords.longitude;
    });

// $scope.submitCatch = function(stuff){
//   $rootScope.catch = stuff;
//   catchService.getFishStats($rootScope.user.displayName).then(function(data){
//     $rootScope.user.fishCaught = data.data.length + 1;
//     console.log("we will now have: ", $rootScope.user.fishCaught);
//     var mapped = _.map(data.data, function(fish){
//       var species = fish.kind
//       return species;
//     })
//     mapped.push($rootScope.catch.kind);
//     var species = _.unique(mapped);
//     console.log("mapped: ", species);
//     $rootScope.user.species = species;
//     console.log("Account update: ", $rootScope.user)
//     Account.updateProfile($rootScope.user);
//   })
// }

$scope.class = "hide";

  $scope.submitCatch = function(stuff){
    if($rootScope.user.points === null || $rootScope.user.points === undefined){
      console.log("there were no points: ", $rootScope.user.points);
      $rootScope.user.points = 0;
      console.log("but now there is: ", $rootScope.user.points);
    }

    $scope.class = "show";


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

    var weightPoints = $rootScope.catch.weight * .25;
    var lengthPoints = $rootScope.catch.length * .25;
    $rootScope.catch.points = weightPoints + lengthPoints;
    $rootScope.user.points += weightPoints + lengthPoints;

    if(file === undefined){
      var retVal = confirm("No image added! Do you want to continue without it? (Note: Harder to prove this catch is real without and image!)");
       if( retVal == true ){
          $scope.catch.image = 'http://www.vinsmoselle.lu/media/cache/397_resized_700_700_90_516407cbbe17d_placeholder.jpg';
            $rootScope.$broadcast('catchImage:added');
            return;
       }
       else{
          $scope.class ="hide";
          return false;
       }
    }


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
        $scope.class = "hide";
        console.log(error);
      }

    })
  }


  $scope.deleteCatch = function(id, thisFish){
    console.log("this is what they are deleting: ", thisFish);
    $rootScope.user.points = $rootScope.user.points - thisFish.points;
    catchService.newAchievement($rootScope.user.points);
    $rootScope.user.fishCaught = Number($rootScope.user.fishCaught) - 1;
    var user = $rootScope.user.displayName.toLowerCase();
    catchService.deleteCatch(user, id);
    Account.updateProfile($rootScope.user);
    $location.path("/profile/main");
  }


  $scope.class1 = "show";
  $scope.class2 ="hide";
  $scope.class3 = "show";
  $scope.class4 ="hide";
  $scope.class5 = "show";
  $scope.class6 ="hide";

  $scope.saveRecipe = function(thisOne, recipe){
    if(thisOne === 'class1'){
      $scope.class1 = "hide";
      $scope.class2 ="show";
    }
    else if(thisOne === 'class3'){
      $scope.class3 = "hide";
      $scope.class4 ="show";
    }
    else if(thisOne === 'class5'){
      $scope.class5 = "hide";
      $scope.class6 ="show";
    }
      var user =  $rootScope.user.displayName;
      var recipe2save= {
        f2f_url : recipe.f2f_url,
        image_url : recipe.image_url,
        recipe_id : recipe.recipe_id,
        title : recipe.title
      }
      recipesService.addToFavs(user, recipe2save).then(function(returned){
      })
  };

  $scope.deleteRecipe = function(thisOne, id){
    if(thisOne === 'class2'){
      $scope.class2 = "hide";
      $scope.class1 ="show";
    }
    else if(thisOne === 'class4'){
      $scope.class4 = "hide";
      $scope.class3 ="show";
    }
    else if(thisOne === 'class6'){
      $scope.class6 = "hide";
      $scope.class5 ="show";
    }
    var user =  $rootScope.user.displayName;
    recipesService.deleteFromFavs(user, id);
  }

  $scope.goBack = function(){
    $window.history.back();
  }

  var watchCallback = function () {
          $rootScope.user.fishCaught = Number($rootScope.user.fishCaught) + 1;
          catchService.getFishStats($rootScope.user.displayName).then(function(data){

            var mapped = _.map(data.data, function(fish){
              var species = fish.kind.toLowerCase();
              return species;
            })

          var isThere = _.contains(mapped, $rootScope.catch.kind.toLowerCase());
          if(isThere !== true){
            $rootScope.user.points += 2;
          }

            mapped.push($rootScope.catch.kind.toLowerCase());
            var species = _.unique(mapped);
            $rootScope.user.species = species;

            var totalPoints = $rootScope.user.points;

            catchService.newAchievement(totalPoints);
            Account.updateProfile($rootScope.user);
          })

          catchService.createCatch($rootScope.catch).success(function(data){
            $location.path('/catchAdded');
          });

          };


  $scope.$on('catchImage:added', watchCallback);

  });
}());
