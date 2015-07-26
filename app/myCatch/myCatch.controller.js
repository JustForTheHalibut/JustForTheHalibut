(function() {
  'use strict';

  angular
    .module('catch')
    .controller('catchController', function ($scope,$http, $geolocation, catchService, Account, $rootScope, $location, Transloadit) {


    if($rootScope.user === undefined){
        Account.getProfile()
          .success(function(data) {
            $scope.user = data;
            $rootScope.user = data;
            console.log($rootScope.user);
            // var user = $rootScope.user.displayName;
            // catchService.deleteCatch(user, '55b3c97cdce66f591a60eabe');
            // catchService.deleteCatch(user, '55b3c91bdce66f591a60eabd');
            // catchService.deleteCatch(user, '55b3c56f66a125cefd161305');
            // catchService.deleteCatch(user, '55b3c43f66a125cefd161304');
            // catchService.deleteCatch(user, '55b38bac66a125cefd161303');
            // catchService.deleteCatch(user, '55b389b466a125cefd161301');
            // catchService.deleteCatch(user, '55b3895f8bcf1d76fdb7f9e5');
            // catchService.deleteCatch(user, '55b38932496be939fd4a2e43');
            // catchService.deleteCatch(user, '55b3888c79b58c8ffca251d5');
            // catchService.deleteCatch(user, '55b388446a715d41fc05e210');
            // catchService.deleteCatch(user, '55b3881726119514fc598e2b');
            // catchService.deleteCatch(user, '55b387c279892d3dfb8155b2');
            // catchService.deleteCatch(user, '55b3874f79892d3dfb8155b1');
          })
    }

    $scope.uploadComplete = function (content) {
        $scope.response = JSON.parse(content); // Presumed content is a json string!
        $scope.response.style = {
          color: $scope.response.color,
          "font-weight": "bold"
        };
      }


    // $scope.submitCatch = function(input){
    //   console.log("this is what we need to submit: ", input);
    //
    //   var $el = $('#upload-form');
    //     $el.transloadit({
    //       wait: true
    //   });
    //   var uploader = $el.data('transloadit.uploader');
    //   console.log("Files: ", uploader);
    // };

    navigator.geolocation.getCurrentPosition(function(position){
      $scope.latitude = position.coords.latitude;
      $scope.longitude = position.coords.longitude;
    });

  $scope.submitCatch = function(file) {
      file.coord = {
        latitude : $scope.latitude,
        longitude : $scope.longitude
      };

      file.displayName = $rootScope.user.displayName.toLowerCase();
      console.log("displayName: ", file.displayName);
      catchService.fishData(file);
      catchService.createCatch(file);
      $location.path('/catchAdded');




    // Transloadit.upload(file, {
    //   params: {
    //     auth: {
    //       key: 'fc73a980313e11e58e2a1d428cc06c07'
    //     },
    //
    //     steps: {
    //      //Resizes the uploaded image to 100x100 px
    //      resize_to_100: {
    //        robot: "/image/resize",
    //        use: ":original",
    //        width: 100,
    //        height: 100,
    //        debug: true
    //      },
    //    }
    //  },
    //
    //   signature: function(callback) {
    //     // ideally you would be generating this on the fly somewhere
    //     $http.get('/api/signature').success(callback);
    //   },
    //
    //   progress: function(loaded, total) {
    //     console.log(loaded + 'bytes loaded');
    //     console.log(total + ' bytes total');
    //   },
    //
    //   processing: function() {
    //     console.log('done uploading, started processing');
    //   },
    //
    //   uploaded: function(assemblyJson) {
    //     console.log(assemblyJson);
    //   },
    //
    //   error: function(error) {
    //     console.log(error);
    //   }
    //
    //
    // });
  }


  $scope.deleteCatch = function(id){
    var user = $rootScope.user.displayName.toLowerCase();
    catchService.deleteCatch(user, id);
    $location.path("/profile/main");
  }



  });
}());
