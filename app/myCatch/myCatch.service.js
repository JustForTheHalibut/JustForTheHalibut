(function() {
  'use strict';

  angular
    .module('catch')
    .factory('catchService', ['$http', '$rootScope', function($http, $rootScope) {


      var getAllCatch = function(user) {
        var name = user.toLowerCase();
        console.log("name: ", name);
        return $http.get('api/collections/' + name);
      }

      var getCatch= function(user, catchId) {
        var name = user.toLowerCase();
          console.log("name: ", name);
        return $http.get('api/collections/' + name +'/' + catchId);
      }

      var createCatch= function(newCatch) {
        var name = newCatch.displayName.toLowerCase();
        console.log("name: ", name);
        console.log("this is what we will post: ", newCatch);
        $http.post('api/collections/' + name,  newCatch).success(function (response) {
              $rootScope.$broadcast('catch:created');
              $rootScope.catch= response;
              console.log(response);
            }).error(function (err) {
              console.log(err);
            });
      }

      var deleteCatch= function(user, catchId) {
        var name = user.toLowerCase();
        console.log("name: ", name);
        $http.delete('api/collections/' + name + '/' + catchId).then(function(res) {
          $rootScope.$broadcast('catch:deleted');
          console.log("it has been done...");
        });
      }

      var fishData = function(data){
        var fish = {
          kind: data.kind,
          coord: data.coord,
        }
        $scope.kind = fish.kind;

        var location = data.location.split(',');
        var place = location[0].replace(" ","_");
        var place = place.toLowerCase();
        console.log("place: ", place);

        $http.get('api/collections/' + place).then(function(data){
          var fishTypeExist = false;
          _.forEach(data.data, function(field){
            if(field.kind === $scope.kind){
              fishTypeExist = true;
            }
          })
          if(fishTypeExist === false){
            console.log("we need to put this is the server: ", fish);
            $http.post('api/collections/' + place, fish).success(function(data){
              console.log(data);
            })
          }
        })
      }

      return {
        fishData: fishData,
        getAllCatch: getAllCatch,
        getCatch: getCatch,
        createCatch: createCatch,
        deleteCatch: deleteCatch
      };

    }]);
})();
