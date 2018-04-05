var mongoose = require('mongoose');
var passport = require('passport');
var config   = require('../config/database');
require('../config/passport')(passport);
var express  = require('express');
var jwt      = require('jsonwebtoken');
var router   = express.Router();
var User     = require("../models/user");
var Project  = require("../models/project");

router.post('/signup', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

router.post('/signin', function(req, res) {
  User.findOne({
    username: req.body.username
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
});

router.post('/project', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    console.log(req.body);
    var newProject = new Project({
      name:        req.body.name,
      description: req.body.description,
      category:    req.body.category,
      user:        req.body.user
    });

    newProject.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Save project failed.'});
      }
      res.json({success: true, msg: 'Successful created new project.'});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

// recupera tutti i progetti
router.get('/project', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Project.find(function (err, projects) {
      if (err) return next(err);
      res.json(projects);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

// recupera il singolo progetto
router.get('/project/:projectId', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Project.findById(req.params.projectId, function(err, project) {
      if(err) {
          console.log(err);
          if(err.kind === 'ObjectId') {
              return res.status(404).send({success:false, message: "Project not found with id " + req.params.projectId});                
          }
          return res.status(500).send({success:false, message: "Error retrieving project with id " + req.params.projectId});
      } 

      if(!project) {
          return res.status(404).send({success:false, message: "Project not found with id " + req.params.projectId});            
      }

      res.send(project);
  });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

// modifica il singolo progetto
router.put('/project/:projectId', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    // Update a project identified by the projectId in the request
    Project.findById(req.params.projectId, function(err, project) {
      if(err) {
          console.log(err);
          if(err.kind === 'ObjectId') {
              return res.status(404).send({success: false,message: "Project not found with id " + req.params.projectId});                
          }
          return res.status(500).send({success: false,message: "Error finding project with id " + req.params.projectId});
      }

      if(!project) {
          return res.status(404).send({success: false,message: "Project not found with id " + req.params.projectId});            
      }

      project.name        = req.body.name;
      project.description = req.body.description;
      project.category    = req.body.category;

      project.save(function(err, data){
          if(err) {
              res.status(500).send({success: false,message: "Could not update project with id " + req.params.projectId});
          } else {
              res.send(data);
          }
      });
  });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.delete('/project/:projectId', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    // Delete a project with the specified projectId in the request
    Project.findByIdAndRemove(req.params.projectId, function(err, project) {
      if(err) {
          console.log(err);
          if(err.kind === 'ObjectId') {
              return res.status(404).send({message: "Project not found with id " + req.params.projectId});                
          }
          return res.status(500).send({message: "Could not delete project with id " + req.params.projectId});
      }

      if(!project) {
          return res.status(404).send({message: "Project not found with id " + req.params.projectId});
      }

      res.send({message: "Project deleted successfully!"})
  });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
