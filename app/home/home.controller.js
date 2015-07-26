(function() {
  'use strict';

  angular
    .module('MyApp')
    .controller('homeController', function ($scope,$http, $window, $rootScope, $location, Account) {
        if($rootScope.user === undefined){
            console.log("this is the user: ", $rootScope.user);
            Account.getProfile()
              .success(function(data) {
                $scope.user = data;
                $rootScope.user = data;
                console.log(data);
              })
        }



  });

}());
