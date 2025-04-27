var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');

var homeRouter = require('./routes/home');
var activeTendersRoutes = require('./routes/activeTenders');
var closedTendersRoutes = require('./routes/closedTenders');
var createTenderRoutes = require('./routes/createTender');
var createBidRoutes = require('./routes/createBid');
var loginRoutes = require('./routes/login');
var registerRoutes = require('./routes/register');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'top-secret', //this should be hidden and more complex
  resave: false,
  saveUninitialized: false,
}));

app.use('/', homeRouter);
app.use('/active-tenders', activeTendersRoutes);
app.use('/closed-tenders', closedTendersRoutes);
app.use('/create-tender', createTenderRoutes);
app.use('/create-bid', createBidRoutes);
app.use('/login-user', loginRoutes);
app.use('/register-user', registerRoutes);

// app.use('/users', usersRouter);



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

module.exports = app;
