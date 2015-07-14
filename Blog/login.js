var port = process.env.PORT || 3000;
var express = require('express')
  , passport = require('passport')
  , util = require('util')
  , LocalStrategy = require('passport-local').Strategy;

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
//var flash    = require('connect-flash
  var monk = require('monk');
  var dburl = 'localhost:27017/nodetest1';

  if (process.env.PORT)
    dburl = "anna:anna@ds049198.mongolab.com:49198/blogcollection";
  var db = monk(dburl);

  var users = db.get('blogsCollection');
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
    findByUsername(username, function(err, user) {
    

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





app.get('/account', ensureAuthenticated, function(req, res){
  res.send(req.user);

});




app.get('/loginfailed', ensureAuthenticated, function(req, res){

  res.send({error:true});

});



app.get('/login', function(req, res){
  res.send("login karrrlo!")
});

// POST /login
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
//
//   curl -v -d "username=bob&password=secret" http://127.0.0.1:3000/login
app.post('/login', passport.authenticate('local', { failureRedirect: '/loginfailed'}), function(req, res) {
    
// Set our collection
  //users.remove({ name: 'sandhya' });

    //console.log("success",req.user);
    //console.log("s2",req.session);

    res.send({success:true});


  });

//check this out. you added this methodd

app.post('/', function(req, res) {
      
          var collection = req.db.get('blogsCollection');

   
    collection.insert( req.body, function (err, doc) 
    {
        if (err) 
        {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");


        }
        else 
        {
          
            res.send({success:true});

        }
    })
 //}

  });


  //res.json(req.body); // req.body is your form data


app.post('/register' , ensureAuthenticated, function(req, res){
  //res.send(req.user);
  //res.send(req.user.inbox.push("Hii");
    console.log("user logggeedd" + " ",req.user);  //user logged
    console.log("title" + " " ,req.body.title);
    console.log("content" + " " ,req.body.content);  //data from form
 

    //req.body.from = req.user.email;
    req.body.timestampp = new Date();
    req.body.from = req.user.username;

    //req.body.blogId = 


     if(!req.user.blog)//|| !doc.subject) 
     {
      req.user.blog = [];
      
     }
  req.user.blog.push(req.body);
  users.updateById(req.user._id, req.user,{});
  

console.log("SUCCESSS");
res.send({success:true});



});


app.post('/blogSite' , function(req, res){
 
    //res.send("user from blogSite" + " ",req.body.user); 
       // req.body.idd = req.body.id
   //console.log("id from blogSite" + " " ,req.body.user.blog);

    var user = users.findOne({username: req.body.user}).on('success', function (doc) {

console.log("SUCCESSS");

console.log("what" + " ",doc.blog[req.body.id]);
//console.log("name" + " ",req.body.id);
res.send(doc.blog[req.body.id]);
//res.send({success:true});
//res.send()

});


  });





app.post('/myBlogSite' , function(req, res){
 

console.log("user print?" + " ",req.body.user);
var user = users.findOne({username: req.body.user}).on('success', function (doc) {
console.log("what the fishh" + " ",doc.blog);
//console.log("name" + " ",req.body.id);
//res.send(doc.blog[req.body.id]);
res.send(doc.blog);

});


  });




app.get('/blogSite', function(req, res){
  var allblogs=[];



  var user = users.find({}).on('success', function (doc) {
      //console.log("bababa" + " ",doc);
      //return fn(null, doc);
      for( var i in doc)
      {
        for(var j in doc[i].blog){
          var cur = doc[i].blog[j];
          cur.blogID = j;

          allblogs.push(cur);
        }

         console.log('doc' + " ", doc[i]._id);

                    users.updateById(doc[i]._id,doc[i],{});

      }

   //  console.log('all blogs' + " ", allblogs);
     // console.log('all ID' + " ", blogID);
      res.send(allblogs);
    });


});





app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.listen(port);


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  console.log("req.user",req.user,req.session);
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}
