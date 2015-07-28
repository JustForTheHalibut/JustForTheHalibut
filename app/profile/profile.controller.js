angular
  .module('profile')

  .controller('TabsController', function ($scope) {
  })

  .controller('ProgressController', function ($scope) {
  $scope.max = 200;
  })

  .controller('ProfileController', function($scope, $auth, $alert, Account, $location, catchService, $rootScope) {

    /**
     * Get user's profile information.
     */
    $scope.getProfile = function() {
      Account.getProfile()
        .success(function(data) {
          $rootScope.user = data;
          console.log(data);
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
              console.log($rootScope.user);
              catchService.getAllCatch($rootScope.user.displayName).then(function(data){
                console.log("these are the fish: ", data.data);
                $rootScope.fish = data.data;
              });
            })
      }
      else{
        catchService.getAllCatch($rootScope.user.displayName).then(function(data){
          console.log("these are the fish: ", data.data);
          $rootScope.fish = data.data;
        });
      }
    }


    $scope.addCatch= function(){
      $location.path('/addCatch');
    }
    
    $scope.deleteCatch = function(id){
      var user = $rootScope.user.displayName.toLowerCase();
      catchService.deleteCatch(user, id);
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


  });
