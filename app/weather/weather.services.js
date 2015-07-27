(function() {
  'use strict';
  angular
    .module('weather')
    .factory('WeatherService', function($http) {

       var getCurrentConditions = function (lat) {
           return $http.get('/api/weather/' + '/?lat=' + lat).then(function(currentConditions){
              console.log("current conditions", currentConditions);
              return {
                    fahrenheit: currentConditions.data.current_observation.temp_f,
                    feelsLike: currentConditions.data.current_observation.feelslike_f,
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


         var getAstronomy = function () {
             return $http.get('/api/astronomy').then(function(astronomy){
                console.log("astronomy", astronomy);
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
                  };
              });
          }

          var getHourly = function(){
              return $http.get('api/hourly').then(function (hourly) {
              console.log("hourly", hourly)
              var hourlyArr = hourly.data.hourly_forecast.slice(0,12);
              return mapHourlyToUrls(hourlyArr);
          });
        }

         var getOneHourly = function (id) {
           return $http.get('api/hourly').then(function (oneHourly) {
             var narrowedDownArr = _.where(oneHourly.data.hourly_forecast);
                return mapHourlyToUrls(narrowedDownArr)[0];
            });
          };

          var getAlerts = function() {
              return $http.get('api/alerts').then(function(alerts){
                //  console.log("alerts", alerts);
                return {
                    alert: alerts.data.alerts.data
                  }
            });
       }


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

          var getForecast = function(){
              return $http.get('api/forecast').then(function (forecast) {
               console.log("forecast", forecast)
               var forecastArr = forecast.data.forecast.simpleforecast.forecastday;
               return mapForecastToUrls(forecastArr);
             });
           }

          var getOneForecast = function (id) {
              return $http.get('api/forecast').then(function (oneForecast) {
                var narrowedDownArr = _.where(oneForecast.data.forecast.simpleforecast.forecastday);
                  return mapForecastToUrls(narrowedDownArr)[0];
                 });
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


          var getTenDayForecast = function(){
               return $http.get('api/tendayforecast').then(function (tenDayForecast) {
                  console.log("tenDayForecast", tenDayForecast)
                  var tenDayForecastArr = tenDayForecast.data.forecast.simpleforecast.forecastday;
                  return mapTenDayForecastToUrls(tenDayForecastArr);
                  });
              }

           var getOneTenDayForecast = function (id) {
                return $http.get('api/tendayforecast').then(function (oneTenDayForecast) {
                    var narrowedDownArr = _.where(oneTenDayForecast.data.forecast.simpleforecast.forecastday);
                    return mapTenDayForecastToUrls(narrowedDownArr)[0];
                    });
                };

           var mapRawTideToUrls = function (collection) {
               return _.map(collection, function (obj) {
               return {
                 height: obj.height
                };
               });
             };


           var getRawTide = function(){
               return $http.get('api/rawtide').then(function (rawtide) {
                 console.log("rawTide", rawtide)
                 var rawTideArr = rawtide.data.rawtide.rawTideObs.slice(0,10);
                 //  var evens = _.filter(rawTideArr, function(num){
                 //    return num >= 0;
                 //    });
                 return mapRawTideToUrls(rawTideArr);
                 });
               }

      return {
        getCurrentConditions: getCurrentConditions,
        getAstronomy: getAstronomy,
        getRawTide: getRawTide,
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
