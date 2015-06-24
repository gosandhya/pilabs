var express = require('express')
  , passport = require('passport')
  , util = require('util')
  , LocalStrategy = require('passport-local').Strategy;

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
//var flash    = require('connect-flash
  var monk = require('monk');
  var db = monk('localhost:27017/nodetest2');

  var users = db.get('loginCollection');
  var messages = {};

var app = express();


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
    var user = users.findOne({ username: username },{},function(err,docs){
      return fn(null,docs);
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


// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
  function(username, password, done) {
    // Find the user by username.  If there is no user with the given
    // username, or the password is not correct, set the user to `false` to
    // indicate failure and set a flash message.  Otherwise, return the
    // authenticated `user`.
    console.log(username);
    findByUsername(username, function(err, user) {
    console.log(user);

      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
      if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
      return done(null, user);
    })
  }
));







// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
//app.use(flash());
app.use(express.static(__dirname + '/public'));





app.get('/account1', ensureAuthenticated, function(req, res){
  res.send(req.user);

});



app.get('/compose' , ensureAuthenticated, function(req, res){
  //res.send(req.user);
//res.send(req.user.inbox.push("Hii"));
//res.send(req.body);
//res.send(req.user);
res.send('chalo');
  //req.user.inbox.push   mail to database of receiver 
});


app.post('/compose2' , ensureAuthenticated, function(req, res){
  //res.send(req.user);
  //res.send(req.user.inbox.push("Hii");
    console.log(req.user);  //user logged
    console.log("email" + " " ,req.body.remail);  //data from form
   // console.log("subject" + " ",req.body.rsubject);
    //res.send(req.user);

    


    req.body.from = req.user.email;
    req.body.timestampp = new Date();

console.log(req.body);

 var user = users.findOne({ email : req.body.remail}).on('success', function (doc) {
     //console.log("bhaaalla" + " ",doc);

      //console.log("hoja" + " ",doc);
     // return fn(null, doc);

     if(!doc.inbox)//|| !doc.subject) 
     {
      doc.inbox = [];
      //doc.subject = [];

     }
  doc.inbox.push(req.body);
  //doc.subject.push(req.body);
  users.updateById(doc._id, doc,{});



    });
  res.redirect('/inbox');

});



app.get('/inbox', ensureAuthenticated, function(req, res){

  res.send(req.user.inbox);


 //var a = $('<div class="todo-holder"> <span class="todo">'+req.user.inbox+'</span></div>');
 
 //$("#inbox").append(a);

});


app.get('/login1', function(req, res){
  res.send("login karrrlo!")
});


app.post('/login1', passport.authenticate('local', { failureRedirect: '/login1'}), function(req, res) {
    


    console.log("success",req.user);
    console.log("s2",req.session);

    res.redirect('/inbox.html');


  });

//check this out. you added this methodd

app.post('/', function(req, res) {
      console.log(req.body);
          var collection = req.db.get('loginCollection');


 //var user = users.findOne({ username : {$ne: req.body.username}}).on('success', function (doc)
// {



    collection.insert( req.body, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.redirect('/');
        }

//});

 });



});

app.get('/delete/*',function(req,res)

{
var index = req.params[0];

req.user.inbox[index].isDeleted=true;


//users.remove({ _id: id }, function (err) {
 // if (err) throw err;
//});


users.updateById(req.user._id, req.user,{});




console.log("I got here atleast");
//res.send(req.user.inbox);


});


app.get('/logout1', function(req, res){
  req.logout();
  res.redirect('/');
});

app.listen(3000);


function ensureAuthenticated(req, res, next) {
  console.log("req.user",req.user,req.session);
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login1');
}