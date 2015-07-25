(function() {
  angular
    .module('maps')

    .controller("MapController", function($scope, uiGmapGoogleMapApi) {
      // Do stuff with $scope.
      $scope.map = {
        center: {
          latitude: 40.322087,
          longitude: -99.757181
          },
          zoom: 3
          };

      uiGmapGoogleMapApi.then(function(maps) {

        });

      });

})();
