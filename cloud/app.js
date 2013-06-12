
// These two lines are required to initialize Express in Cloud Code.
var express = require('express');
var app = express();

// Global app configuration section
app.set('views', 'cloud/views');  // Specify the folder to find templates
app.set('view engine', 'ejs');    // Set the template engine
app.use(express.bodyParser());    // Middleware for reading request body
app.use(express.methodOverride());

// This is an example of hooking up a request handler with a specific request
// path and HTTP verb using the Express routing API.
app.get('/hello', function(req, res) {
  res.render('hello', { message: 'Congrats, you just set up your app!' });
});

app.locals.APP_ID = "QHc1hgsPjxtIGtefrPcUD7yqoH6QphbRR5Aa58pd";
app.locals.JS_KEY = "sLF8zZjtOPSk7xbeHwULNMNvi3Q2krXVgtuT4kvf";

var surveyController = require('cloud/controllers/survey.js');

app.get('/survey', surveyController.index);
app.get('/survey/new', surveyController.new);
app.post('/survey/create', surveyController.create);

var submissionController = require('cloud/controllers/submission.js');

app.get('/submissions', submissionController.index);
app.get('/submission/new', submissionController.new);
app.post('/submission/created', submissionController.created);

var promoController = require('cloud/controllers/promo.js');

//app.get('/promo', submissionController.index);
app.get('/promo/new', promoController.new);
app.get('/promo/check', promoController.check);



// // Example reading from the request query string of an HTTP get request.
// app.get('/test', function(req, res) {
//   // GET http://example.parseapp.com/test?message=hello
//   res.send(req.query.message);
// });

// // Example reading from the request body of an HTTP post request.
// app.post('/test', function(req, res) {
//   // POST http://example.parseapp.com/test (with request body "message=hello")
//   res.send(req.body.message);
// });

// Attach the Express app to Cloud Code.
app.listen();
