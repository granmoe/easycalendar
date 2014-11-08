// DEPENDENCIES
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

// SERVER CONFIGURATION
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded()); // {extended: true} ?
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('env', 'development');
app.set('port', process.env.PORT || 3000);

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
} else {
// production error handler
// no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}


/* ReST API
    routes
        /api/appts/:appt_id

create → POST   /collection
read → GET   /collection[/id]
update → PUT   /collection/id
patch → PATCH   /collection/id
delete → DELETE   /collection/id */

// use regex to not respond to any routes except / and /api ???
// need to handle invalid params passed to API
// GET: '/api/:year/:month'

app.get('/api', function (req, res) {
  //res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'From the api router' });
  console.log('API is running');
});

// START SERVER
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port
   + '\n http://localhost:3000');
});

// JSON tests:

var data = 
{
    "month": "1",
    "year": "2015",
    "events": [
        {
            "month": "1",
            "year": "2015",
            "id": "3",
            "title": "Node.js Training - Day 1",
            "time": "9:00a - 4:00p",
            "day": "11",
            "address": "7601 Penn Ave S, Richfield, MN"
        }
    ]
}

// only write out these explicit json keys, can develop a more complex
// replacer function to also sanitize the values
var jsonFilter =  
    ['month', 'year', 'events', 'id', 'title', 'time', 'day', 'address'];

// Read/Write the whole file
// TODO: CRUD functionality for single event data
var destFile = 'events_dev.json';
// fs.writeFile(destFile, JSON.stringify(data, jsonFilter, 4), function(err) {
//     if(err) {
//       console.log(err);
//     } else {
//       console.log("JSON saved to " + destFile);
//     }
// });

// fs.appendFile(destFile, ", \n" + JSON.stringify(data, jsonFilter, 4), function(err) {
//     if(err) {
//       console.log(err);
//     } else {
//       console.log("JSON appended to " + destFile);
//     }
// });