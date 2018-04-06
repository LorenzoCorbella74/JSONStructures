var mongoose = require('mongoose');
var passport = require('passport');
var config   = require('../config/database');
require('../config/passport')(passport);
var express  = require('express');
var jwt      = require('jsonwebtoken');
var router   = express.Router();
var User     = require("../models/user");
var Project  = require("../models/project");

const userCtrl = require('../controllers/userCtrl.js');
const projectCtrl = require('../controllers/projectCtrl');

// UTENTE
router.post('/signup',userCtrl.create );    // crea utente (register)
router.post('/signin', userCtrl.login);     // login utente

// PROGETTI
router.post('/project', passport.authenticate('jwt', { session: false}), projectCtrl.create );                  // crea un nuovo progetto
router.get('/project', passport.authenticate('jwt', { session: false}), projectCtrl.getUserProjects);           // recupera tutti i progetti di un utente
router.get('/project/:projectId', passport.authenticate('jwt', { session: false}), projectCtrl.getProjectById); // recupera il singolo progetto passando l'id
router.put('/project/:projectId', passport.authenticate('jwt', { session: false}), projectCtrl.update);         // modifica il singolo progetto
router.delete('/project/:projectId', passport.authenticate('jwt', { session: false}), projectCtrl.delete);      // cancella il  progetto

// STREAMS

// STUCTURES

module.exports = router;
