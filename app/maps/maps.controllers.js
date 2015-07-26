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
        eeuu: {
            lat: 39,
            lng: -100,
            zoom: 4
        },
        layers: {
            baselayers: {
                xyz: {
                    name: 'OpenStreetMap (XYZ)',
                    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    type: 'xyz'
                }
            },
            historic: {
             name: "Historic Topographic Maps",
               type: "agsTiled",
               url: "http://services.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer",
               visible: false
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
        },
        defaults: {
            scrollWheelZoom: false
        }
    });
    }]);

})();
