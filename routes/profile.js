var express = require('express');
var router = express.Router();
var User = require('../entities/User');
var config = require('../config');
var request = require('request');
var ensureAuthenticated = require('./helpers').ensureAuthenticated;
var crypto = require('crypto');

/*
 |--------------------------------------------------------------------------
 | GET /api/me
 |--------------------------------------------------------------------------
 */
router.route('/signature')
  .post(function (req, res) {

        var authKey    = config.TRANSLOADIT_KEY;
        var authSecret = config.TRANSLOADIT_SECRET;

        var params = {
          'auth': {
            'key': authKey,
            'expires': req.body.expiry
          },
          template_id: '4c370e3035fe11e58282c51c26a58cc0'
          // your other params like template_id, notify_url, etc.
        };
        var paramsString = JSON.stringify(params);

        var signature = crypto
            .createHmac('sha1', authSecret)
            .update(new Buffer(paramsString, 'utf-8'))
            .digest('hex');

      console.log(signature);
      res.send({signature: signature, expires: req.body.expiry});
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
      user.fishCaught = req.body.fishCaught || user.fishCaught;
      user.species = req.body.species || user.species;
      user.save(function(err) {
        res.status(200).end();
      });
    });
  });

  router.route('/recipes/:fish')
  .get(function(req,res,next) {
    var url = 'http://food2fork.com/api/search?key=3e093f219fcfb4680956efc732f0965c&q=' + req.params.fish
    request.get({url: url}, function(err, response, data) {
      res.send(JSON.parse(response.body));
    })
  })

  router.route('/recipeDetails/:rId')
  .get(function(req,res,next) {
    var url = 'http://food2fork.com/api/get?key=3e9166ad629eca6587a5e501e4e30961&rId=' + req.params.rId
    request.get({url: url}, function(err, response, data) {
      res.send(JSON.parse(response.body));
    })
  })
router.route('/weather/:latitude/:longitude')
  .get(function(req,res,next) {
    var url = 'https://api.wunderground.com/api/597438d76ee788fb/conditions/q/' + req.params.latitude + ',' + req.params.longitude + '.json'
    request.get({url: url}, function(err, response, data) {
      res.send(JSON.parse(response.body));
    })
  })

router.route('/astronomy/:latitude/:longitude')
    .get(function(req,res,next) {
      var url = 'http://api.wunderground.com/api/597438d76ee788fb/astronomy/q/' + req.params.latitude + ',' + req.params.longitude + '.json'
      request.get({url: url}, function(err, response, data) {
        res.send(JSON.parse(response.body));
      })
    })

router.route('/hourly/:latitude/:longitude')
    .get(function(req,res,next) {
      var url = 'http://api.wunderground.com/api/597438d76ee788fb/hourly/q/' + req.params.latitude + ',' + req.params.longitude + '.json'
        request.get({url: url}, function(err, response, data) {
          res.send(JSON.parse(response.body));
        })
      })

router.route('/forecast/:latitude/:longitude')
    .get(function(req,res,next) {
      var url = 'http://api.wunderground.com/api/597438d76ee788fb/forecast/q/' + req.params.latitude + ',' + req.params.longitude + '.json'
        request.get({url: url}, function(err, response, data) {
          res.send(JSON.parse(response.body));
        })
      })

router.route('/tendayforecast/:latitude/:longitude')
    .get(function(req,res,next) {
      var url = 'http://api.wunderground.com/api/597438d76ee788fb/forecast10day/q/' + req.params.latitude + ',' + req.params.longitude + '.json'
        request.get({url: url}, function(err, response, data) {
          res.send(JSON.parse(response.body));
        })
      })

router.route('/alerts/:latitude/:longitude')
    .get(function(req,res,next) {
      var url = 'http://api.wunderground.com/api/597438d76ee788fb/alerts/q/' + req.params.latitude + ',' + req.params.longitude + '.json'
        request.get({url: url}, function(err, response, data) {
          res.send(JSON.parse(response.body));
        })
      })

router.route('/tide')
  .get(function(req,res,next) {
    var url = 'http://api.wunderground.com/api/597438d76ee788fb/tide/q/29464.json'
      request.get({url: url}, function(err, response, data) {
        res.send(JSON.parse(response.body));
      })
    })

module.exports = router;
