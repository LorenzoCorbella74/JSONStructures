var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');
var jsonwebtoken = require('jsonwebtoken') ;
var config       = require('./config/database');

var api = require('./routes/api');
var app = express();

mongoose.Promise = require('bluebird');
mongoose.connect(config.database, { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('Connected succesfully to mongoDB.'))
  .catch((err) => console.error(err));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

// JWT setup
app.use((req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
     jsonwebtoken.verify(req.headers.authorization.split(' ')[1], config.secret, (err, decode) => {
         if (err) req.user = undefined;
         req.user = decode;
         next();
     });
  } else {
      req.user = undefined;
      next();
  }
});

app.use('/api', api);

app.get('/', (req, res) => res.send(`REST API per la web app JSON Structures.`));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, ()=> console.log('Magic happen oh port 3000!'))

module.exports = app;
