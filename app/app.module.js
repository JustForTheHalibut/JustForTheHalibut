angular.module('MyApp', [
'ngMessages',
'ngRoute',
'ngSanitize',
'mgcrea.ngStrap',
'ng-transloadit',
'auth',
'profile',
'posts',
'weather',
'ui.bootstrap',
'uiGmapgoogle-maps',
'ngGeolocation',
'maps',
'chart.js',
'recipes',
'geolocation',
'catch',
'moment'
])

.config(function($routeProvider) {
$routeProvider
  .when('/', {
    templateUrl: 'home/views/home.html',
    controller: 'homeController'
  })
  .when('/404', {
    template: '<h1>Sorry, page not found</h1>'
  })
  .otherwise({
    redirectTo: '/404'
  });
});

angular
      .module('moment', [])
      .factory('moment', function ($window) {
        return $window.moment;
      });

angular
  .module('ng-transloadit', [])
  .factory('Transloadit', ['$http', '$rootScope', '$timeout', function($http, $rootScope, $timeout, catchService) {
    $scope = $rootScope.$new();

    var TRANSLOADIT_API = 'https://api2-eu-west-1.transloadit.com/assemblies';


    return {
      upload: function(file, options) {
        var cancelled = false;
        var xhr = new XMLHttpRequest();

        this._validateBrowser();
        this._validateOptions(options);


        function check(assemblyUrl) {
          if (cancelled) {
            return false;
          }

          $timeout(function() {
              $http.get(assemblyUrl).success(function(results) {
                if (results.ok === 'ASSEMBLY_COMPLETED') {
                  options.uploaded(results);
                } else {
                  check(results.assembly_ssl_url);
                }
              }).error(options.error);
          }, 2000);
        }

        options.signature(function(sigObject) {
          // this gets the same expiry that was generated on L144 in myCatch.controller.js
          options.params.auth.expires = sigObject.expires;
          var paramsValue = JSON.stringify(options.params);

          var formData = new FormData();
          formData.append('params', paramsValue);
          formData.append('signature', sigObject.signature);
          formData.append(file.name, file);


          xhr.open('POST', TRANSLOADIT_API, true);
          xhr.onload = function(response) {
            var results = angular.fromJson(this.response);
            options.processing();;
            $rootScope.catch.image = results.uploads[0].url;
            //comment out above and uncomment below in order to run on localhost:3000
            // $rootScope.catch.image = "http://www.placecage.com/g/200/300"
            if($rootScope.catch.image !== undefined){
                $rootScope.$broadcast('catchImage:added');
            }

            // check(results.assembly_ssl_url);
          };

          xhr.upload.onprogress = function(e) {
            if (e.lengthComputable) {
              options.progress(e.loaded, e.total);
            }
          };

          xhr.send(formData);
        });

        return {
          cancel: function() {
            cancelled = true;
            xhr.abort();
          }
        };
      },

      _validateBrowser: function() {
        var isXHR2 = typeof new XMLHttpRequest().upload !== 'undefined';

        if (!isXHR2) {
          throw new Error('Transloadit will only work with XMLHttpRequest 2');
        }
      },

      _validateOptions: function(options) {
        // mandatory fields
        if (!options.signature) {
          throw new Error('must supply a signature function');
        }

        if (!options.uploaded) {
          throw new Error('must supply an uploaded callback');
        }

        if (!options.params) {
          throw new Error('must supply params');
        }

        if (!options.params.auth.key) {
          throw new Error('must supply a key');
        }

        // optional fields
        options.processing = options.processing || function() {};
        options.progress = options.progress || function() {};
        options.error = options.error || function() {};
      }
    };
}]);
