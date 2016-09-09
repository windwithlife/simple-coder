var express = require('express');
//var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
//var compression = require("compression");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var cors = require('cors');
//var webRouter = require('./routes/pages/web_router');
//var apiRouter = require('./routes/api/api_router_v1');
//var soaRouter = require('./routes/api/soa_router');
var webRouterAuto = require('./routes/pages/auto_web_router');
//var users = require('./routes/pages/users');
//var test = require('./routes/pages/test');

//var dbManager = require("./models/database/db-manager");

var app = express();
//init database
//dbManager.initDB();

/*/config the session
var sOption = {
    secret: '12345',
    name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 80000},  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
};*/


//app.use(session(sOption));
//app.use(express.session({secret: "test"}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//add additional layout support for ejs.
var partials = require('express-partials');
app.use(partials());

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'web')));
//app.use(express.static(path.join(__dirname, 'webresource')));

//set up routers...

//app.use("/work",test);
//app.use(users.authUserPower);
//app.use('/api/v1',  apiRouter); //支持跨域访问CORS.
//app.use('/api/v1',  soaRouter); //支持跨域访问CORS.

//app.use('/api/v1', apiRouter);
app.use('/', webRouterAuto);
//app.use('/', webRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
