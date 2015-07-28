(function() {
  angular
    .module('maps')

//     .controller("MapController", function($scope, uiGmapGoogleMapApi) {
//
//       $scope.map = {
//         center: {
//           latitude: 45,
//           longitude: -73
//           },
//           zoom: 8
//           };
//
//
//     uiGmapGoogleMapApi.then(function(maps) {
//
//     });
// });


    .controller("LeafController", [ '$scope', function($scope, LeafService) {
      angular.extend($scope, {
             center: {
                 lat: 39,
                 lng: -100,
                 zoom: 4,
             },
             defaults: {
               minZoom: 4,
               maxZoom: 4,
               zoomControl: false,
               scrollWheelZoom: false
             },
             markers: {},
             layers: {
                 baselayers: {
                     xyz: {
                         name: 'OpenStreetMap (XYZ)',
                         url: 'http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png',
                         type: 'xyz'
                     }
                 },
             }
         });

        //  LeafService.getMarkers().then(function(fishLocation) {
        //   $scope.createMarkers(fishLocation);
        // });
        // $scope.createMarker = function(location) {
        //   var marker = {
        //     idKey: location._id,
        //     coords: {
        //       latitude: location.latitude,
        //       longitude: location.longitude
        //     },
        //     userName: location.displayName
        //   };
        //   return marker;
        // };
        //
        // $scope.createMarkers = function(fishLocation) {
        //   for (var i = 0; i < fishLocation.data.length; i++) {
        //     var marker = $scope.createMarker(fishLocation.data[i]);
        //     $scope.markers.push(marker);
        //   }
        //   console.log($scope.markers);
        // };

    }]);




})();
