(function() {
  'use strict';
   angular
      .module('weather')
      .factory('WeatherService', function($http, $q, $cacheFactory) {

      var cacheEngine = $cacheFactory('WeatherCache');

      var getCurrentConditions = function (latitude,longitude) {
        return $http.get('/api/weather/' + latitude + '/' + longitude).then(function(currentConditions){
          console.log(currentConditions);
            return {
                    fahrenheit: currentConditions.data.current_observation.temp_f,
                    feelsLike: currentConditions.data.current_observation.feelslike_f,
                    icon: currentConditions.data.current_observation.icon,
                    iconUrl: currentConditions.data.current_observation.icon_url,
                    city: currentConditions.data.current_observation.display_location.city,
                    state: currentConditions.data.current_observation.display_location.state,
                    description: currentConditions.data.current_observation.weather,
                    windGust: currentConditions.data.current_observation.wind_gust_mph,
                    wind: currentConditions.data.current_observation.wind_mph,
                    windDirection: currentConditions.data.current_observation.wind_dir,
                    visability: currentConditions.data.current_observation.visibility_mi,
                    humidity: currentConditions.data.current_observation.relative_humidity,
                    rain: currentConditions.data.current_observation.precip_today_metric,
                    pressure: currentConditions.data.current_observation.pressure_in,
                    UV: currentConditions.data.current_observation.UV,
                    dew: currentConditions.data.current_observation.dewpoint_f
                  }
              });
           }

        var getAstronomy = function (latitude,longitude) {
          return $http.get('/api/astronomy/' + latitude + '/' + longitude).then(function(astronomy){
              return {
                      phaseofMoon: astronomy.data.moon_phase.phaseofMoon,
                      ageOfMoon: astronomy.data.moon_phase.ageOfMoon,
                      ilum: astronomy.data.moon_phase.precentIlluminated,
                      sunRiseHour: astronomy.data.sun_phase.sunrise.hour,
                      sunRiseMin: astronomy.data.sun_phase.sunrise.minute,
                      sunSetHour: astronomy.data.sun_phase.sunset.hour,
                      sunSetMin: astronomy.data.sun_phase.sunset.minute
                    }
                });
             }

          var mapHourlyToUrls = function (collection) {
            return _.map(collection, function (obj) {
              return {
                      condition: obj.condition,
                      time: obj.FCTTIME.civil,
                      iconUrl: obj.icon_url,
                      humidity: obj.humidity,
                      temp: obj.temp.english,
                      feels: obj.feelslike.english,
                      pop: obj.pop,
                      windspeed: obj.wspd.metric,
                      windDir: obj.wdir.dir,
                    }
                });
             }

          var getHourly = function(latitude,longitude){
            var deferred = $q.defer();
            var cache = cacheEngine.get('hourly');
              if(cache){
                deferred.resolve(cache);
              }else{
                $http.get('api/hourly/' + latitude + '/' + longitude).then(function (hourly) {
                var hourlyArr = hourly.data.hourly_forecast.slice(0,12);
                  cacheEngine.put('hourly', mapHourlyToUrls(hourlyArr));
                  deferred.resolve(mapHourlyToUrls(hourlyArr));
                });
              }
              return deferred.promise;
            };

         var getOneHourly = function (id,latitude,longitude){
           var deferred = $q.defer();
           var cache = cacheEngine.get('hourly');
              if(cache){
                deferred.resolve(_.where(cache, {id: id})[0]);
              }else{
                $http.get('api/hourly/' + latitude + '/' + longitude).then(function (oneHourly) {
                var narrowedDownArr = _.where(oneHourly.data.hourly_forecast, {id: id});
                deferred.resolve(mapHourlyToUrls(narrowedDownArr)[0]);
              });
            }
            return deferred.promise;
          };

          var mapForecastToUrls = function (collection) {
            return _.map(collection, function (obj) {
              return {
                      conditions: obj.conditions,
                      date: obj.date.pretty,
                      weekday: obj.date.weekday,
                      iconUrl: obj.icon_url,
                      high: obj.high.fahrenheit,
                      low: obj.low.fahrenheit,
                      pop: obj.pop,
                      aveWind: obj.avewind.mph,
                    };
                });
             };

          var getForecast = function(latitude,longitude){
            var deferred = $q.defer();
            var cache = cacheEngine.get('forecast');
              if(cache){
                deferred.resolve(cache);
              }else{
                $http.get('api/forecast/' + latitude + '/' + longitude).then(function (forecast) {
                var forecastArr = forecast.data.forecast.simpleforecast.forecastday;
                cacheEngine.put('forecast', mapForecastToUrls(forecastArr));
                deferred.resolve(mapForecastToUrls(forecastArr));
             });
           }
           return deferred.promise;
         };

          var getOneForecast = function (id,latitude,longitude) {
            var deferred = $q.defer();
            var cache = cacheEngine.get('forecast');
               if(cache){
                 deferred.resolve(_.where(cache, {id: id})[0]);
               }else{
                 $http.get('api/forecast/' + latitude + '/' + longitude).then(function (oneForecast) {
                 var narrowedDownArr = _.where(oneForecast.data.forecast.simpleforecast.forecastday, {id: id});
                 deferred.resolve(mapForecastToUrls(narrowedDownArr)[0]);
              });
             }
             return deferred.promise;
           };

          var mapTenDayForecastToUrls = function (collection) {
            return _.map(collection, function (obj) {
              return {
                      conditions: obj.conditions,
                      month: obj.date.monthname,
                      day: obj.date.day,
                      iconUrl: obj.icon_url,
                      high: obj.high.fahrenheit,
                      low: obj.low.fahrenheit,
                      pop: obj.pop,
                      aveWind: obj.avewind.mph,
                      aveWindDir: obj.avewind.dir,
                      aveHum: obj.avehumidity
                      };
                  });
              };

          var getTenDayForecast = function(latitude,longitude){
            var deferred = $q.defer();
            var cache = cacheEngine.get('tenDayForecast');
              if(cache){
                deferred.resolve(cache);
              }else{
                $http.get('api/tendayforecast/' + latitude + '/' + longitude).then(function (tenDayForecast) {
                var tenDayForecastArr = tenDayForecast.data.forecast.simpleforecast.forecastday.slice(0,7);
                cacheEngine.put('tenDayForecast', mapTenDayForecastToUrls(tenDayForecastArr));
                deferred.resolve(mapTenDayForecastToUrls(tenDayForecastArr));
              });
            }
            return deferred.promise;
          };

          var getOneTenDayForecast = function (id,latitude,longitude) {
            var deferred = $q.defer();
             var cache = cacheEngine.get('oneTenDayForecast');
                if(cache){
                  deferred.resolve(_.where(cache, {id: id})[0]);
                }else{
                  $http.get('api/tendayforecast/' + latitude + '/' + longitude).then(function (oneTenDayForecast) {
                  var narrowedDownArr = _.where(oneTenDayForecast.data.forecast.simpleforecast.forecastday, {id: id});
                  deferred.resolve(mapTenDayForecastToUrls(narrowedDownArr)[0]);
                });
              }
              return deferred.promise;
            };

          var getAlerts = function(latitude,longitude) {
            return $http.get('api/alerts/' + latitude + '/' + longitude).then(function(alerts){
              return {
                      alert: alerts.data.alerts.data
                     }
                  });
                }

          var mapTideToUrls = function (collection) {
             return _.map(collection, function (obj) {
               return {
                      height: obj.data.height,
                      type: obj.data.type
                      }
                  });
               }

           var getTide = function(){
               return $http.get('api/tide').then(function (tide) {
                //  console.log("tide", tide)
                 var tideArr = tide.data.tide.tideSummary;
                 return mapTideToUrls(tideArr);
                 })
               }

        return {
                getCurrentConditions: getCurrentConditions,
                getAstronomy: getAstronomy,
                getTide: getTide,
                getHourly: getHourly,
                getOneHourly: getOneHourly,
                getAlerts: getAlerts,
                getForecast: getForecast,
                getOneForecast: getOneForecast,
                getTenDayForecast: getTenDayForecast,
                getOneTenDayForecast: getOneTenDayForecast,
              };
        });
})();
