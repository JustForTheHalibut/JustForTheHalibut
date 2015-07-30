(function() {
  angular
    .module('maps')
    .factory('LeafService', function($http) {

        var getProfile = function(user){
            var name = user.toLowerCase();
            return $http.get('/api/collections/' + name);
        }

        var getAllProfiles = function(){
          return $http.get('/api/allUsers');
        }

        return {
          getProfile: getProfile,
          getAllProfiles: getAllProfiles
        }
  })
})();
