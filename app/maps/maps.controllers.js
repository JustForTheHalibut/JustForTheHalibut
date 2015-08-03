(function() {
  angular
    .module('maps')

      .controller("MapController", function($scope, uiGmapGoogleMapApi, Account, LeafService, $rootScope, $http, $window, $location) {
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
        console.log("location: ", location);
        var marker = {
            idKey: location._id,
              coords: {
                latitude: location.coord.latitude,
                longitude: location.coord.longitude
            },
            userName: location.displayName,
            fish: location.kind,
            weight: location.weight,
            length: location.length
        };
            return marker;
      };

      $scope.createMarkers = function(userData) {
        for (var i = 0; i < userData.length; i++) {
        var marker = $scope.createMarker(userData[i]);
            $scope.markers.push(marker);
            }
      };

      // LeafService.getProfile('scott').then(function(userData){
      //   $scope.createMarkers(userData);
      // })

      LeafService.getAllProfiles().then(function(data){
        var markers= _.map(data.data, function(obj){
          LeafService.getProfile(obj.displayName).then(function(data){
           if(data.data !== undefined){
             if(data.data.length !== 0){
               $scope.createMarkers(data.data);
             }
           }
            })
          })
        })

      uiGmapGoogleMapApi.then(function(maps) {

      });

    })

})();
