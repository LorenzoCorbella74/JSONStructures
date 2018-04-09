const User = require('../models/user.js');
var jwt      = require('jsonwebtoken');
var config   = require('../config/database');

// crea un nuovo utente
exports.create = (req, res) => {
  if (!req.body.userName || !req.body.password) {
    res.json({ success: false, msg: 'Please pass userName and password.' });
  } else {
    var newUser = new User({
      userName: req.body.userName,
      password: req.body.password
    });
    // save the user
    newUser.save(function (err) {
      if (err) {
        return res.json({ success: false, msg: 'Username already exists.' });
      }
      res.json({ success: true, msg: 'Successful created new user.' });
    });
  }
};

// logga l'utente
exports.login = (req, res) => {
    User.findOne({
      userName: req.body.userName
    }, function(err, user) {
      if (err) throw err;
      if (!user) {
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // if user is found and password is right create a token
            var token = jwt.sign(user.toJSON(), config.secret);
            // return the information including token as JSON
            res.json({success: true, token: 'JWT ' + token, id:user._id});
          } else {
            res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
    });
};

