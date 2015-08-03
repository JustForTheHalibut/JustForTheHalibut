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
        zoom: 8,
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
            options: {
              icon:'assets/fish.png'
            },
            userName: location.displayName,
            fish: location.kind
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

        var styleArray = [ //any style array defined in the google documentation you linked
          {
         featureType: "administrative",
         elementType: "labels",
         stylers: [
           { visibility: "on" }
         ]
       },{
         featureType: "poi",
         elementType: "labels",
         stylers: [
           { visibility: "off" }
         ]
       },{
         featureType: "road",
         stylers: [
           { "visibility": "off" }
         ]
       },{
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#3e606f"
            },
            {
                "weight": 2
            },
            {
                "gamma": 0.84
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "weight": 0.6
            },
            {
                "color": "#1a3541"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2c5a71"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#406d80"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#2c5a71"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#29768a"
            },
            {
                "lightness": -37
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#406d80"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#193341"
            }
        ]
    }
];



$scope.options = {

   styles: styleArray
};

      uiGmapGoogleMapApi.then(function(maps) {

      });

    })

})();
