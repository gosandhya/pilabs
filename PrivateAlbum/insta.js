
var port = process.env.PORT || 3030;

var express = require('express')
  , passport = require('passport')
  , util = require('util')
  , LocalStrategy = require('passport-local').Strategy;

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var jsonParser = bodyParser.json();
var session = require('express-session');
//var flash    = require('connect-flash
  var monk = require('monk');
  var dburl = 'localhost:27017/nodetest1';


if (process.env.PORT)
    dburl = "anna:anna@ds053251.mongolab.com:53251/albumcollection";
  
  var db = monk(dburl);
  

  var users = db.get('albumsCollection');
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





function findById(id, fn) {
   //for (var i = 0, len = users.length; i < len; i++) {
    //var user = users[i];
    var user = users.findOne({ _id: id }).on('success', function (doc) {
      console.log("bhaaalla" + " ",doc);
      return fn(null, doc);

    });

}


function findByUsername(username, fn) {
  //for (var i = 0, len = users.length; i < len; i++) {
    //var user = users[i];
    var user = users.findOne({ username: username }).on('success', function (doc) {
      console.log("bababa" + " ",doc);
      return fn(null, doc);

    });


}



app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// configure Express
app.use(cookieParser());
//app.use(express.methodOverride());
app.use(session({
  
  secret: 'keyboard cat'
  //resave: true,
  //saveUninitialized: true,
  //cookie : { secure : false, maxAge : (40 * 60 * 60 * 1000)}, // 4 hours
}));

app.use(passport.initialize());
app.use(passport.session());




// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  console.log("ser",user);
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  console.log(id,"id");
  findById(id, function (err, user) {
    done(err, user);
  });
});


passport.use(new LocalStrategy(
  function(username, password, done) {

    findByUsername(username, function(err, user) {
    

      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
      if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
      return done(null, user);
    })
  }
));



app.use(express.static(__dirname + '/public'));



app.post("/data",jsonParser, ensureAuthenticated, function(req,res){


    console.log("user logged" + " ",req.user.email);  //user logged
    console.log("email" + " " ,req.body.url);
    console.log("email" + " " ,req.body.caption);   //data from form

    req.body.timestampp = new Date();


  
     if(!req.user.album)
     {
      req.user.album = [];
      //doc.subject = [];

     }

  req.user.album.push(req.body);
  //req.user.album.push(req.body.caption);
  //doc.subject.push(req.body);
  users.updateById(req.user._id, req.user,{});
  res.redirect('/album.html');




});

app.get("/data", function(req,res,next){


  res.send(req.user.album)
   console.log("urllll" + " ",req.user.album);



  });





app.get('/account', ensureAuthenticated, function(req, res){
  res.send(req.user);

});



app.get('/login', function(req, res){
  res.send("login karrrlo!")
});


app.post('/login', passport.authenticate('local', { failureRedirect: '/login'}), function(req, res) {
    
// Set our collection


    console.log("success",req.user);
    console.log("s2",req.session);

    res.redirect('/album.html');


  });

//check this out. you added this methodd

app.post('/', function(req, res) {
      req.body
          var collection = req.db.get('albumsCollection');

    // Submit to the DB
    
    collection.insert( req.body, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.redirect('/');
        }

});


  //res.json(req.body); // req.body is your form data
});



app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.listen(port);


function ensureAuthenticated(req, res, next) {
  console.log("req.user",req.user,req.session);
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}