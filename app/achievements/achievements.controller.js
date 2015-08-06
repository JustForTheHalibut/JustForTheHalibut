(function() {
  'use strict';
  angular
    .module('achieve')
    .controller('achieveController', function ($scope, $http, Account, $rootScope, $location, $window, $timeout, LeafService, catchService) {
      if($rootScope.user === undefined){
          Account.getProfile()
            .success(function(data) {
              $scope.user = data;
              $rootScope.user = data;
              console.log($rootScope.user);
              $scope.countTo = $rootScope.user.points;
              $scope.countFrom = 0;
              $timeout(function(){
                $scope.progressValue = $scope.countTo;
              }, 200);
            })
      }
      else{
        console.log($rootScope.user);
        $scope.countTo = $rootScope.user.points;
        $scope.countFrom = 0;
        $timeout(function(){
          $scope.progressValue = $scope.countTo;
        }, 200);
      }

      $scope.addCatch= function(){
        $location.path('/addCatch');
      }


      if($rootScope.topThree === undefined){
        $rootScope.threeBigCatches = [];
        LeafService.getAllProfiles().then(function(data){
          //This calculates the top three leveled memebers
          var sortArray = [];
          _.forEach(data.data, function(entry){
            if(entry.points === undefined || entry.points === null){
              console.log("no points");
            }
            else{
              sortArray.push(entry);
            }
          })
          sortArray.sort(function(a,b) {
            return b.points - a.points;
          });
          $rootScope.topThree = [];

          for(var i = 0; i < 3; i++){
            $rootScope.topThree.push(sortArray[i]);
            catchService.getAllCatch($rootScope.topThree[i].displayName).then(function(data){
              var sortCatches = data.data;
              console.log("sort Catches: ", sortCatches);
              sortCatches.sort(function(a,b){
                return b.points - a.points;
              });
              $rootScope.threeBigCatches.push(sortCatches[0]);
              $rootScope.topThree[$rootScope.threeBigCatches.length - 1].catch = $rootScope.threeBigCatches[$rootScope.threeBigCatches.length - 1]
              console.log("three big id: ", $rootScope.threeBigCatches);
            })
          }

          // End of top three leveled memebers
        });
      }
      else if($rootScope.topThree[0].catch === undefined && $rootScope.threeBigCatches === undefined){
        for(var i = 0; i < 3; i++){
          catchService.getAllCatch($rootScope.topThree[i].displayName).then(function(data){
            var sortCatches = data.data;
            console.log("sort Catches: ", sortCatches);
            sortCatches.sort(function(a,b){
              return b.points - a.points;
            });
            $rootScope.threeBigCatches.push(sortCatches[0]);
            $rootScope.topThree[$rootScope.threeBigCatches.length - 1].catch = $rootScope.threeBigCatches[$rootScope.threeBigCatches.length - 1]
            console.log("three big id: ", $rootScope.threeBigCatches);
          })
        }
        console.log("topThree: ", $rootScope.threeBigCatches);
      }

      else if($rootScope.topThree[0].catch === undefined && $rootScope.threeBigCatches !== undefined){
        for(var i = 0; i < 3; i++){
            $rootScope.topThree[i].catch = $rootScope.threeBigCatches[i];
        }
        console.log("topThree with Catches: ", $rootScope.topThree);
      }

      $scope.viewTheirCatch= function(user, id){
        console.log("user: ", user);
        console.log("id: ", id);
        $rootScope.someUser = user.toLowerCase();
        $location.path("/detail/" + id);
      }

  });
}());
