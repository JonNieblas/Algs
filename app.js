'use strict';
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sass = require('node-sass-middleware');

const indexRouter = require('./routes/index');
const karatsubaRouter = require('./routes/karatsuba');
const sequenceRouter = require('./routes/sequence');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  sass({
    src: path.join(__dirname, '/public/scss/'),
    dest: path.join(__dirname, '/public/'),
    debug: true,
  }),
  express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/karatsuba', karatsubaRouter);
app.use('/sequence', sequenceRouter);

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

// allows for use of app in other files
module.exports = app;
