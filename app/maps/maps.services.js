  angular.module('maps')
      .factory('LeafService', function($http) {

        var getProfile = function(user){
          var name = user.toLowerCase();
          return $http.get('/api/collections/' + name);
        }

        return {
          getProfile: getProfile
          }
      });
