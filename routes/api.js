var express  = require('express');
var router   = express.Router();

const userCtrl      = require('../controllers/userCtrl.js');
const projectCtrl   = require('../controllers/projectCtrl.js');
const streamCtrl    = require('../controllers/streamCtrl.js');
const structureCtrl = require('../controllers/structureCtrl.js');

// UTENTE
router.post('/signup',userCtrl.create );    // crea utente (register)
router.post('/signin', userCtrl.login);     // login utente

// PROGETTI
router.post('/project', userCtrl.loginRequired, projectCtrl.create );                  // crea un nuovo progetto
router.get('/project', userCtrl.loginRequired, projectCtrl.getUserProjects);           // recupera tutti i progetti di un utente
router.get('/project/:projectId', userCtrl.loginRequired, projectCtrl.getProjectById); // recupera il singolo progetto passando l'id
router.put('/project/:projectId', userCtrl.loginRequired, projectCtrl.update);         // modifica il singolo progetto
router.delete('/project/:projectId', userCtrl.loginRequired, projectCtrl.delete);      // cancella il  progetto

// STREAMS
router.post('/stream', userCtrl.loginRequired, streamCtrl.create );                    // crea un nuovo stream
router.get('/stream', userCtrl.loginRequired, streamCtrl.getUserStreams);              // recupera tutti gli stream di un utente
router.get('/stream/:streamId', userCtrl.loginRequired, streamCtrl.getStreamById);     // recupera il singolo stream passando l'id
router.put('/stream/:streamId', userCtrl.loginRequired, streamCtrl.update);            // modifica il singolo stream
router.delete('/stream/:streamId', userCtrl.loginRequired, streamCtrl.delete);         // cancella il  stream

// STUCTURES
router.post('/structure', userCtrl.loginRequired, structureCtrl.create );                       // crea una nuova structure
router.get('/structure', userCtrl.loginRequired, structureCtrl.getUserStructures);              // recupera tutti le structure di un utente
router.get('/structure/:structureId', userCtrl.loginRequired, structureCtrl.getStructureById);  // recupera il singolo structure passando l'id
router.put('/structure/:structureId', userCtrl.loginRequired, structureCtrl.update);            // modifica il singolo structure
router.delete('/structure/:structureId', userCtrl.loginRequired, structureCtrl.delete);         // cancella il  stream

module.exports = router;
