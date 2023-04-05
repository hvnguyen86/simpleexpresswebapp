var createError = require('http-errors');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const config = require('config');
const port = config.get('server.port');

var http = require("http");
var express = require('express');

var app = express();
var server = http.createServer(app);

app.get("/",function(req,res){
  res.render('index',{title: "Start Page"})
});

app.get("/aboutus",function(req,res){
  res.render('aboutus',{title: "About Us"})
});

app.get("/imprint",function(req,res){
  res.render('imprint',{title: "Imprint"})
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs-locals'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

server.listen(port);
console.log(`Server listen to port ${port}`);