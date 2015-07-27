var express = require('express');
var router = express.Router();
var User = require('../entities/User');
var config = require('../config');
var request = require('request');
var ensureAuthenticated = require('./helpers').ensureAuthenticated;

/*
 |--------------------------------------------------------------------------
 | GET /api/me
 |--------------------------------------------------------------------------
 */
router.route('/signature')
  .get(function (req, res) {
    res.send("Hello Tiffany");
  });
 router.route('/allUsers')
  .get(function (req, res) {
    User.find({}, function (err, users) {
      res.send(users);
    });
  });

router.route('/me')
  .all(ensureAuthenticated)
  .get(function(req, res) {
    User.findById(req.user, function(err, user) {
      res.send(user);
    });
  })
  .put(function(req, res) {
    User.findById(req.user, function(err, user) {
      if (!user) {
        return res.status(400).send({ message: 'User not found' });
      }
      // add any new user properties here as well as entities/User.js and routes/profile.js
      // user.newProperty = req.body.newProperty || user.newProperty
      user.displayName = req.body.displayName || user.displayName;
      user.email = req.body.email || user.email;
      user.achievement = req.body.achievement || user.achievement;
      user.achievementPicture = req.body.achievementPicture || user.achievementPicture;
      user.save(function(err) {
        res.status(200).end();
      });
    });
  });


router.route('/weather')
  .get(function(req,res,next) {
    console.log("lat: ", req.query.lat);
    var url = 'https://api.wunderground.com/api/01019dd17955e688/conditions/q/' + req.query.lat +'.json'

    request.get({url: url}, function(err, response, data) {
      res.send(JSON.parse(response.body));
    })
  })

router.route('/hourly')
    .get(function(req,res,next) {
      var url = 'http://api.wunderground.com/api/01019dd17955e688/hourly/q/29464.json'

        request.get({url: url}, function(err, response, data) {
          res.send(JSON.parse(response.body));
        })
      })

router.route('/rawtide')
  .get(function(req,res,next) {
    var url = 'http://api.wunderground.com/api/01019dd17955e688/rawtide/q/29464.json'

      request.get({url: url}, function(err, response, data) {
        res.send(JSON.parse(response.body));
      })
    })

router.route('/alerts')
    .get(function(req,res,next) {
      var url = 'http://api.wunderground.com/api/01019dd17955e688/alerts/q/29464.json'

      request.get({url: url}, function(err, response, data) {
        res.send(JSON.parse(response.body));
      })
    })

router.route('/forecast')
    .get(function(req,res,next) {
      var url = 'http://api.wunderground.com/api/01019dd17955e688/forecast/q/29464.json'

      request.get({url: url}, function(err, response, data) {
        res.send(JSON.parse(response.body));
        })
      })

router.route('/tendayforecast')
    .get(function(req,res,next) {
      var url = 'http://api.wunderground.com/api/01019dd17955e688/forecast10day/q/29464.json'

        request.get({url: url}, function(err, response, data) {
          res.send(JSON.parse(response.body));
          })
        })

router.route('/astronomy')
    .get(function(req,res,next) {
      var url = 'http://api.wunderground.com/api/01019dd17955e688/astronomy/q/29464.json'

      request.get({url: url}, function(err, response, data) {
        res.send(JSON.parse(response.body));
        })
      })

module.exports = router;
