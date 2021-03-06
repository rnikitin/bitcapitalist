
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var bitstamp_api = require('./routes/bitstamp_api.js');
var http = require('http');
var path = require('path');
var browserify = require('browserify-middleware');

var app = express();

// all environments
app.engine('html', require('hogan-express'));
app.locals.delimiters = '<% %>';
app.set('view engine', 'html');
app.set('view options', { layout: false });

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/// JS
app.get('/js/app.js', browserify('./public/js/app/main.js', { minify: false, cache: false, debug: true, gzip: true }));

/// ROUTES
app.get('/', routes.index);
bitstamp_api.register(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

