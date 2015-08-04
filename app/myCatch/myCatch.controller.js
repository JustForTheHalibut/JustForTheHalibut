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
            console.log($rootScope.user);
            // var user = 'scott';
            // catchService.deleteCatch(user, '55ba79b0bfc8df62e06bd45f');
          })
    }

    catchService.getCatch($rootScope.user.displayName, $routeParams.catchId).then(function (aCatch) {
        console.log("this is what we need to display: ", aCatch);
        $scope.aCatch = aCatch.data;
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
        for (var i = 0; i < 3; i++) { //add a random number generator to pick random recipes
          var next = recipes[i];
          fewRecipes.push(next);
        }
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

  // var weightPoints = $rootScope.catch.weight * .25;
  // var lengthPoints = $rootScope.catch.length * .25;
  // $rootScope.thesePoints = weightPoints + lengthPoints;

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


  $scope.deleteCatch = function(id){
    var user = $rootScope.user.displayName.toLowerCase();
    $rootScope.user.fishCaught = Number($rootScope.user.fishCaught) - 1;
    Account.updateProfile($rootScope.user);
    catchService.deleteCatch(user, id);
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

          // var isThere  _.exist($rootScope.catch.kind, species)
          //
          //   if(isThere !== true){
          //     $rootScope.thesePoints += 2;
          //   }


            mapped.push($rootScope.catch.kind.toLowerCase());
            var species = _.unique(mapped);
            $rootScope.user.species = species;


            Account.updateProfile($rootScope.user);

            //
            // // if(points > 0 && points < 5){
            //     $user.achievementLevel = 'krill';
            //     $user.achievementPicture = /////
            // // if(points > 5 && points < 10 ){
            //     $user.achievementLevel = 'sardine';
            // // if(points > 10 && points < 15){
            //     $user.achievementLevel = 'achovy';
            // // if(points > 15 && points < 20){
            //     $user.achievementLevel = 'mackeral';
            // // if(points > 20 && points < 25){
            //     $user.achievementLevel = 'perch';
            // //if(points > 25 && points < 30){
            //     $user.achievementLevel = 'snapper';
            // //if(points > 30 && points < 35){
            //     $user.achievementLevel = 'red fish';
            // //if(points > 35 && points < 40){
            //     $user.acheivementLevel = 'salmon';
            // //if(points > 40 && points < 45){
            //   $user.acheivementLevel = 'grouper';
            // //if(points > 45 && points < 50){
            //   $user.achievementLevel = 'halibut';





          })

          catchService.createCatch($rootScope.catch).success(function(data){
            $location.path('/catchAdded');
          });

          };


  $scope.$on('catchImage:added', watchCallback);

  });
}());
