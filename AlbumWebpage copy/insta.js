var port = process.env.PORT || 3001;
var express = require('express')
  , passport = require('passport')
  , util = require('util')
  , LocalStrategy = require('passport-local').Strategy;


var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var cookieParser = require('cookie-parser');
var session = require('express-session');

//var flash    = require('connect-flash
  var monk = require('monk');
  var dburl = 'localhost:27017/nodetest1';

  if (process.env.PORT)
    dburl = "anna:anna@ds049198.mongolab.com:49198/imagecollection";
  var db = monk(dburl);

  var users = db.get('imagesCollection');
  var messages = {};

var app = express();
/*var users = [
    { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
  , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];

*/

//users.insert( [{ username: "bob", password: "secret" , email: "bob@example.com"} ,
  //{ username: "joe", password: "birthday" , email: "joe@example.com"}] );


// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});




app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    
    next();
});

//host files that are in public folder (like .html files) on localhost:3030/ 
app.use('/',  express.static(__dirname + '/public'));

app.post("/data",jsonParser, function(req,res){


// Set our collection
    var collection = req.db.get('imagesCollection');
console.log(req.body);

    // Submit to the DB
    collection.insert(
             req.body, function (err, doc)
              {
        if (err) {
            // If it failed, return error

            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.sendStatus(200);
           // console.log()
        }
       

    });




  //messages[req.params[0]] = req.body;
  //var path = req.params[0];
  //console.log(path,req.body);
});




app.get("/data", function(req,res,next){

var collection = req.db.get('imagesCollection');
collection.find({},{},function(e,docs){
    res.send(docs);
    console.log("urllll" + " ",docs);
});




  });

var server = app.listen(port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);

});


