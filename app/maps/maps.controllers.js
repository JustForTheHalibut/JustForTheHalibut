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
             markers: {
            charleston: {
                lat: 32.718714,
                lng: -79.734598,
                focus: true,
                draggable: false
            },
            ocean: {
                lat: 29.245501,
                lng: -87.927439,
                focus: true,
                draggable: false
            },
            west: {
                lat: 37.315417,
                lng: -123.611034,
                focus: true,
                draggable: false
            }
        },
             layers: {
                 baselayers: {
                     xyz: {
                         name: 'OpenStreetMap (XYZ)',
                         url: 'http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png',
                         type: 'xyz'
                     }
                 },
                //  overlays: {
                //      wms: {
                //          name: 'EEUU States (WMS)',
                //          type: 'wms',
                //          visible: true,
                //          url: 'http://suite.opengeo.org/geoserver/usa/wms',
                //          layerParams: {
                //              layers: 'usa:states',
                //              format: 'image/png',
                //              transparent: true
                //          }
                //      }
                //  }
             }
         });

    }]);

})();
