(function() {
  angular
    .module('maps')

    // .controller("MapController", function($scope, uiGmapGoogleMapApi) {
    //   // Do stuff with $scope.
    //   $scope.map = {
    //     center: {
    //       latitude: 40.322087,
    //       longitude: -99.757181
    //       },
    //       zoom: 3
    //       };
    //
    //   uiGmapGoogleMapApi.then(function(maps) {
    //
    //     });
    //
    //   })

    .controller("LeafController", [ '$scope', function($scope) {
      angular.extend($scope, {
             center: {
                 lat: 39,
                 lng: -100,
                 zoom: 4
             },
             layers: {
                 baselayers: {
                     xyz: {
                         name: 'OpenStreetMap (XYZ)',
                         url: 'http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',
                         type: 'xyz'
                     }
                 },
                 overlays: {
                     wms: {
                         name: 'EEUU States (WMS)',
                         type: 'wms',
                         visible: true,
                         url: 'http://suite.opengeo.org/geoserver/usa/wms',
                         layerParams: {
                             layers: 'usa:states',
                             format: 'image/png',
                             transparent: true
                         }
                     }
                 }
             }
         });
    }]);

})();
