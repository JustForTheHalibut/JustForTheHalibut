(function() {
  'use strict';

  angular
    .module('catch')
    .factory('catchService', ['$http', '$rootScope', function($http, $rootScope) {


      var getAllCatch = function(user) {
        var name = user.toLowerCase();
        return $http.get('api/collections/' + name);
      }

      var getCatch= function(user, catchId) {
        var name = user.toLowerCase();
        return $http.get('api/collections/' + name +'/' + catchId);
      }

      var getFishStats = function(user){
        var name = user.toLowerCase();
        return $http.get('api/collections/' + name);;
      }

      var createCatch= function(newCatch) {

        var combinedName = newCatch.displayName.replace(" ","_");
        var combinedName = combinedName.toLowerCase();

        return $http.post('api/collections/' + combinedName,  newCatch).success(function (response) {
              $rootScope.$broadcast('catch:created');
              $rootScope.catch= response;
            }).error(function (err) {
              console.log(err);
            });
      }

      var deleteCatch= function(user, catchId) {
        var name = user.toLowerCase();
        var name = user;
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

        $http.get('api/collections/' + place).then(function(data){
          var fishTypeExist = false;
          _.forEach(data.data, function(field){
            if(field.kind === $scope.kind){
              fishTypeExist = true;
            }
          })
          if(fishTypeExist === false){
            $http.post('api/collections/' + place, fish).success(function(data){
              console.log(data);
            })
          }
        })
      }

      var newAchievement = function(totalPoints){
        if(totalPoints > 0 && totalPoints < 5){
          $rootScope.user.achievement = 'Krill';
          $rootScope.user.achievementPicture = 'http://www.supersmart.com/data/images/illustration/I0638.jpg';
          return;
        }
        else if(totalPoints > 5 && totalPoints < 10){
          $rootScope.user.achievement = 'Sardine';
          $rootScope.user.achievementPicture = 'http://www.powerboats.lv/images/products/storm-wildeye-live-sardine-1305787677777.jpg';
          return;
        }
        else if(totalPoints > 10 && totalPoints < 15){
          $rootScope.user.achievement = 'Anchovy';
          $rootScope.user.achievementPicture = 'http://www.monkeyfacenews.com/.a/6a0120a5c94e03970b01630604abc5970d-800wi';
          return;
        }
        else if(totalPoints > 15 && totalPoints < 20){
          $rootScope.user.achievement = 'Mackeral';
          $rootScope.user.achievementPicture = 'http://www.bim.ie/media/bim/content/species/horse_mackerel.jpg';
          return;
        }
        else if(totalPoints > 20 && totalPoints < 25){
          $rootScope.user.achievement = 'Perch';
          $rootScope.user.achievementPicture = 'http://kswildlife.org/ww/wp-content/uploads/2014/06/YellowPerch.jpg';
          return;
        }
        else if(totalPoints > 25 && totalPoints < 30){
          $rootScope.user.achievement = 'Snapper';
          $rootScope.user.achievementPicture = 'https://upload.wikimedia.org/wikipedia/commons/5/50/Paddletail_melb_aquarium.jpg';
          return;
        }
        else if(totalPoints > 30 && totalPoints < 35){
          $rootScope.user.achievement = 'Red Fish';
          $rootScope.user.achievementPicture = 'http://wallpaper.pickywallpapers.com/1366x768/red-fish.jpg';
          return;
        }
        else if(totalPoints > 35 && totalPoints < 40){
          $rootScope.user.achievement = 'Salmon';
          $rootScope.user.achievementPicture = 'http://www.fish-on-friday.com/wp-content/uploads/2014/03/0502_salmon_460x276.jpg';
          return;
        }
        else if(totalPoints > 40 && totalPoints < 45){
          $rootScope.user.achievement = 'Grouper';
          $rootScope.user.achievementPicture = 'https://upload.wikimedia.org/wikipedia/commons/2/29/Epinephelus_malabaricus.jpg';
          return;
        }
        else if(totalPoints > 45 && totalPoints < 50){
          $rootScope.user.achievement = 'Halibut';
          $rootScope.user.achievementPicture = 'http://www.fishwatch.gov/seafood_profiles/species/halibut/imgs/galleries/pacific_halibut/06.jpg';
          return;
        }
        return 'success';

      }

      return {
        fishData: fishData,
        getAllCatch: getAllCatch,
        getCatch: getCatch,
        getFishStats: getFishStats,
        createCatch: createCatch,
        newAchievement: newAchievement,
        deleteCatch: deleteCatch
      };

    }]);
})();
