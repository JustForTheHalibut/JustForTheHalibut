
(function() {
  angular
    .module('maps')

    .controller("MapController", function($scope, Account, LeafService, $rootScope, $http, $window, $location) {
    if($rootScope.user === undefined){
        Account.getProfile()
          .success(function(data) {
            $scope.user = data;
            $rootScope.user = data;
            console.log(data);
          })
    }

    $scope.map = {
      center: {
        latitude: 32.792447,
        longitude: -79.936134
        },
        zoom: 8
        };

        $scope.markers = [];

        $scope.createMarker = function(location) {
           var marker = {
                 idKey: location._id,
                 coords: {
                   latitude: location.coord.latitude,
                   longitude: location.coord.longitude
                 },
                 userName: location.displayName,
               };
               return marker;
             };

               $scope.createMarkers = function(userData) {
               for (var i = 0; i < userData.data.length; i++) {
                 var marker = $scope.createMarker(userData.data[i]);
                 $scope.markers.push(marker);
               }
               console.log($scope.markers);
             };

             LeafService.getProfile('bob').then(function(userData){
                $scope.createMarkers(userData);
              //  console.log("this is bob: ", userData.data);
             })

           })


})();
