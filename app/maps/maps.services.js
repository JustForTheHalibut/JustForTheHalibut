(function () {
'use strict';
  angular
        .module('maps')
        .factory('LeafService', function($http) {

          var userDataUrl = "http://localhost:3000/api/collections/bob"

          var mapUserDataToUrls = function (collection) {
            return _.map(collection, function (obj) {
              return {
                      coord: obj.coord,
                    }
                });
             }

             var getMarkers = function(){
                 return $http.get('userDataUrl').then(function (userData) {
                   console.log("userData", userData)
                   var userDataArr = userData.data;
                   return mapUserDataToUrls(userDataArr);
                   })
                 }


          return {
            getMarkers: getMarkers,
          }

    });
})();
