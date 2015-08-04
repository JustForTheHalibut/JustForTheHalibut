angular
  .module('profile')

  .controller('TabsController', function ($scope) {
  })

  .controller('ProgressController', function ($scope) {
  $scope.max = 200;
  })

  .controller('ProfileController', function($scope, $auth, $alert, Account, $location, catchService, $rootScope) {

    $scope.isCollapsed = false;

    /**
     * Get user's profile information.
     */

    $scope.getProfile = function() {
      Account.getProfile()
        .success(function(data) {
          $rootScope.user = data;
        })
        .error(function(error) {
          $alert({
            content: error.message,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };

    if($location.path() === '/profile/main'){
      if($rootScope.user === undefined){
          Account.getProfile()
            .success(function(data) {
              $scope.user = data;
              $rootScope.user = data;
              catchService.getAllCatch($rootScope.user.displayName).then(function(data){
                $rootScope.fish = data.data;
                if($rootScope.fish.length !== $rootScope.user.fishCaught){
                  $rootScope.user.fishCaught = $rootScope.fish.length;
                  Account.updateProfile($rootScope.user);
                }
                if($rootScope.fish.length === 0){
                  $rootScope.user.points = 0;
                  $rootScope.user.species = [];
                  Account.updateProfile($rootScope.user);
                  console.log("user: ", $rootScope.user);
                }
              });
            })
      }
      else{
        catchService.getAllCatch($rootScope.user.displayName).then(function(data){
          $rootScope.fish = data.data;
          if($rootScope.fish.length !== $rootScope.user.fishCaught){
            $rootScope.user.fishCaught = $rootScope.fish.length;
            Account.updateProfile($rootScope.user);
          }
          if($rootScope.fish.length === 0){
            $rootScope.user.points = 0;
            $rootScope.user.species = [];
            Account.updateProfile($rootScope.user);
            console.log("user: ", $rootScope.user);
          }
        });
      }
    }

    var fishDeleted = function(){
      catchService.getAllCatch($rootScope.user.displayName).then(function(data){
        console.log("these are the fish: ", data.data);
        $rootScope.fish = data.data;
      });
    }


    $scope.addCatch= function(){
      $location.path('/addCatch');
    }

    $scope.deleteCatch = function(id, thisFish){
      console.log("this is what they are deleting: ", thisFish);
      $rootScope.user.points = $rootScope.user.points - thisFish.points;
      catchService.newAchievement($rootScope.user.points);
      console.log("the user is now: ", $rootScope.user);
      $rootScope.user.fishCaught = Number($rootScope.user.fishCaught) - 1;
      var user = $rootScope.user.displayName.toLowerCase();
      catchService.deleteCatch(user, id);
      Account.updateProfile($rootScope.user);
      $location.path("/profile/main");
    }


    /**
     * Update user's profile information.
     */
    $scope.updateProfile = function() {
      Account.updateProfile({
        displayName: $scope.user.displayName,
        email: $scope.user.email
      }).then(function() {
        $alert({
          content: 'Profile has been updated',
          animation: 'fadeZoomFadeDown',
          type: 'material',
          duration: 3
        });
      });
    };

    /**
     * Link third-party provider.
     */
    $scope.link = function(provider) {
      $auth.link(provider)
        .then(function() {
          $alert({
            content: 'You have successfully linked ' + provider + ' account',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        })
        .then(function() {
          $scope.getProfile();
        })
        .catch(function(response) {
          $alert({
            content: response.data.message,
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };

    /**
     * Unlink third-party provider.
     */
    $scope.unlink = function(provider) {
      $auth.unlink(provider)
        .then(function() {
          $alert({
            content: 'You have successfully unlinked ' + provider + ' account',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        })
        .then(function() {
          $scope.getProfile();
        })
        .catch(function(response) {
          $alert({
            content: response.data ? response.data.message : 'Could not unlink ' + provider + ' account',
            animation: 'fadeZoomFadeDown',
            type: 'material',
            duration: 3
          });
        });
    };

    $scope.getProfile();

    $scope.$on('catch:deleted', fishDeleted);

  });
