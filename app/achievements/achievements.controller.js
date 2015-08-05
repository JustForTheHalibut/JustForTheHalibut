(function() {
  'use strict';

  angular
    .module('achieve')
    .controller('achieveController', function ($scope, $http, Account, $rootScope, $location, $window, $timeout) {
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


  });
}());
