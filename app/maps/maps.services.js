(function () {
'use strict';
  angular
        .module('maps')
        .factory('LeafService', function($http) {

          var fishDataUrl = "http://localhost:3000/api/collections/" + lat + long


          var getMarkers = function() {
            return $http.get(fishDataUrl).then(function(fishData){
              return fishData.data;
            })
          };

          return {
            getMarkers: getMarkers,
          }

    });
})();
