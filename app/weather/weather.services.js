(function() {
  'use strict';
  angular
    .module('weather')
    .factory('WeatherService', function($http) {
      var currentConditionsUrl = "http://api.wunderground.com/api/5a8252229fd2895b/conditions/q/CA/San_Francisco.json"

      var mapDataToUrls = function (collection) {
         return _.map(collection, function (obj) {
           return {
             city: obj.data.city,
             };
         });
       };

      var getCurrentConditions = function () {
      var deferred = $q.defer();
      var cache = cacheEngine.get('current conditions');
        if(cache) {
          console.log('we are in our cache');
          deferred.resolve(cache);
        } else {
          $http.get(currentConditionsUrl).then(function (currentConditions) {
          var currentConditionsArray = currentConditions.data;
            console.log('we are in our http method');
            cacheEngine.put('current conditions', mapDataToUrls(currentConditionsArray));
            deferred.resolve(mapDataToUrls(currentConditionsArray));
          });
        }
      return deferred.promise;
   };

      return {
        getCurrentConditions: getCurrentConditions
      };

    });
})();
