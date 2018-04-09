var mongoose = require('mongoose');
var passport = require('passport');
var config   = require('../config/database');
require('../config/passport')(passport);
var express  = require('express');
var jwt      = require('jsonwebtoken');
var router   = express.Router();
var User     = require("../models/user");
var Project  = require("../models/project");

const userCtrl      = require('../controllers/userCtrl.js');
const projectCtrl   = require('../controllers/projectCtrl.js');
const streamCtrl    = require('../controllers/streamCtrl.js');
const structureCtrl = require('../controllers/structureCtrl.js');

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
router.post('/stream', passport.authenticate('jwt', { session: false}), streamCtrl.create );                    // crea un nuovo stream
router.get('/stream', passport.authenticate('jwt', { session: false}), streamCtrl.getUserStreams);              // recupera tutti gli stream di un utente
router.get('/stream/:streamId', passport.authenticate('jwt', { session: false}), streamCtrl.getStreamById);     // recupera il singolo stream passando l'id
router.put('/stream/:streamId', passport.authenticate('jwt', { session: false}), streamCtrl.update);            // modifica il singolo stream
router.delete('/stream/:streamId', passport.authenticate('jwt', { session: false}), streamCtrl.delete);         // cancella il  stream

// STUCTURES
router.post('/structure', passport.authenticate('jwt', { session: false}), structureCtrl.create );                       // crea una nuova structure
router.get('/structure', passport.authenticate('jwt', { session: false}), structureCtrl.getUserStructures);              // recupera tutti le structure di un utente
router.get('/structure/:structureId', passport.authenticate('jwt', { session: false}), structureCtrl.getStructureById);  // recupera il singolo structure passando l'id
router.put('/structure/:structureId', passport.authenticate('jwt', { session: false}), structureCtrl.update);            // modifica il singolo structure
router.delete('/structure/:structureId', passport.authenticate('jwt', { session: false}), structureCtrl.delete);         // cancella il  stream

module.exports = router;
