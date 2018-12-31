var express= require('express');
var cookieParser = require('cookie-parser');
var session= require('express-session');
var bodyParser= require('body-parser');
var multer= require('multer');
var upload= multer();

module.exports = app => {
  app.set('view engine','pug');
  app.set('view engine', 'ejs');
  app.set('views', './views');
  app.use(express.static('public'));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(upload.array());
  app.use(session({secret:'it'}));
}
