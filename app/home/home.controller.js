(function() {
  'use strict';

  angular
    .module('MyApp')
    .controller('homeController', function ($scope,$http, $window, $rootScope, $location, Account) {
        if($rootScope.user === undefined){
            Account.getProfile()
              .success(function(data) {
                $scope.user = data;
                $rootScope.user = data;
                console.log(data);
              })
          }
      })

      .controller('NavbarController', function($scope, $auth) {
        $scope.isAuthenticated = function() {
          return $auth.isAuthenticated();
        };

      });

})();
