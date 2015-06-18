var port = 3030;
var jsonData = {"1434459494387":{"msg":"Hi","nick":"sand","timestamp":1434459494387},"1434472045055":{"msg":"ah","nick":"sand","timestamp":1434472045055},"1434472052156":{"msg":"it is working","nick":"sand","timestamp":1434472052156},"1434475238955":{"msg":"sandhya","nick":"komal","timestamp":1434475238955},"1434478979943":{"msg":"hello","nick":"sandh","timestamp":1434478979943},"1434479562833":{"msg":"sss","nick":"sandhi","timestamp":1434479562833},"1434479727387":{"msg":"ddd","nick":"sa","timestamp":1434479727387},"1434479761795":{"msg":"sss","nick":"koaml","timestamp":1434479761795},"1434479841776":{"msg":"kk","nick":"kk","timestamp":1434479841776},"1434480398616":{"msg":"sss","nick":"sandhua","timestamp":1434480398616},"1434483668227":{"msg":"jdjd","nick":"snahdy","timestamp":1434483668227},"1434483679334":{"msg":"happening?","nick":"snowshine","timestamp":1434483679334},"1434483831879":{"msg":"sss","nick":"snow?","timestamp":1434483831879},"1434483843742":{"msg":">","nick":"hshs","timestamp":1434483843742},"1434483942235":{"msg":"ddd","nick":"chale?","timestamp":1434483942235},"1434484009253":{"msg":"aa","nick":"k","timestamp":1434484009253},"1434484439078":{"msg":"ss","nick":"snow","timestamp":1434484439078},"1434484447386":{"msg":"horaha ha?","nick":"sunshine","timestamp":1434484447386},"1434484811925":{"msg":"www","nick":"wno","timestamp":1434484811925},"1434484818620":{"msg":"horaha h?","nick":"wno","timestamp":1434484818620},"1434489334073":{"msg":"ddd","nick":"ss","timestamp":1434489334073},"1434489413954":{"msg":"hhhhh","nick":"snowshine","timestamp":1434489413954},"1434489442513":{"msg":"noooo","nick":"snowshine","timestamp":1434489442513},"1434489451256":{"msg":"hiiii","nick":"sandhya","timestamp":1434489451256},"1434489465821":{"msg":"bcc","nick":"azeeem","timestamp":1434489465821},"1434489498485":{"msg":"hiiii","nick":"sandhya","timestamp":1434489498485},"1434489519130":{"msg":"iiii","nick":"azeeemmmm","timestamp":1434489519130},"1434491941137":{"msg":"sss","nick":"snow","timestamp":1434491941137},"1434492063223":{"msg":"hi","nick":"snow","timestamp":1434492063223},"1434492074838":{"msg":"hows","nick":"snow","timestamp":1434492074838},"1434492083503":{"msg":"ddd","nick":"wad","timestamp":1434492083503},"1434492130504":{"msg":"sss","nick":"snowshine","timestamp":1434492130504},"1434492163731":{"msg":"ddd","nick":"sss","timestamp":1434492163731},"1434492260168":{"msg":"dff","nick":"snow","timestamp":1434492260168},"1434492304666":{"msg":"dddd","nick":"aa","timestamp":1434492304666},"1434520365870":{"msg":"aa","nick":"s","timestamp":1434520365870},"1434520448078":{"msg":"s","nick":"s","timestamp":1434520448078},"1434520473472":{"msg":"hello","nick":"anna","timestamp":1434520473472},"1434520976567":{"msg":"ffff","nick":"sss","timestamp":1434520976567},"1434521021420":{"msg":"fff","nick":"snowshine","timestamp":1434521021420},"1434521405243":{"msg":"ffff","nick":"snwo","timestamp":1434521405243},"1434521934499":{"msg":"oh","nick":"","timestamp":1434521934499},"1434521941670":{"msg":"alrightt","nick":"","timestamp":1434521941670},"1434522031553":{"msg":"ki","nick":"","timestamp":1434522031553},"1434522291814":{"msg":"hu","nick":"","timestamp":1434522291814},"1434523203967":{"msg":"yo","nick":"ddd","timestamp":1434523203967},"1434523244126":{"msg":"sss","nick":"","timestamp":1434523244126},"1434540389672":{"msg":"ff","nick":"","timestamp":1434540389672},"1434540529233":{"msg":"dd","nick":"sonu","timestamp":1434540529233},"1434540983297":{"msg":"ddd","nick":"sabd","timestamp":1434540983297},"1434541261309":{"msg":"f","nick":"sabd","timestamp":1434541261309},"1434542185751":{"msg":"oo","nick":"h","timestamp":1434542185751},"1434543148309":{"msg":"dddd","nick":"sa","timestamp":1434543148309},"1434543170098":{"msg":"ddd","nick":"snow","timestamp":1434543170098},"1434543183059":{"msg":"what?","nick":"snow","timestamp":1434543183059},"1434543188602":{"msg":"no chnagess?","nick":"snow","timestamp":1434543188602},"1434543194295":{"msg":"nnn","nick":"snow","timestamp":1434543194295},"1434543202322":{"msg":"can't get it?","nick":"snow","timestamp":1434543202322},"1434543348622":{"msg":"fff","nick":"ss","timestamp":1434543348622},"1434543711282":{"msg":"ddff","nick":"snadhya","timestamp":1434543711282},"1434544794760":{"msg":"dddd","nick":"s","timestamp":1434544794760},"1434544804491":{"msg":"fffff","nick":"s","timestamp":1434544804491},"1434544832622":{"msg":"ddd","nick":"ddd","timestamp":1434544832622},"1434544835905":{"msg":"dddd","nick":"ddd","timestamp":1434544835905},"1434544841495":{"msg":"kksks","nick":"ddd","timestamp":1434544841495},"1434544875325":{"msg":"ddd","nick":"ss","timestamp":1434544875325},"1434545389703":{"msg":"dddd","nick":"ddddddddd","timestamp":1434545389703},"1434545502353":{"msg":"hhh","nick":"dd","timestamp":1434545502353},"1434545557146":{"msg":"oaa","nick":"ggg","timestamp":1434545557146},"1434545818670":{"msg":"fff","nick":"fff","timestamp":1434545818670},"1434545908164":{"msg":"hiii ","nick":"ff","timestamp":1434545908164},"1434557614612":{"msg":"gg","nick":"fg","timestamp":1434557614612}};
var messages = {};
/////////
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var express = require('express');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');
var app = express();


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
app.use('/', express.static(__dirname + '/public'));

app.post("/send/*",jsonParser,function(req,res){


// Set our collection
    var collection = req.db.get('messagescollection');

    // Submit to the DB
    collection.insert(
             req.body, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            res.sendStatus(200);
        }
    });




	//messages[req.params[0]] = req.body;
	//var path = req.params[0];
	//console.log(path,req.body);
});


/*app.get("/", function(req,res,next){
	//console.log("/");
	res.send("hello");
});
*/

app.get("/data", function(req,res,next){
//res.send(jsonData);
//res.send(messages);


var collection = req.db.get('messagescollection');
collection.find({},{},function(e,docs){

    //console.log(docs);
    res.send(docs);
});




	});

var server = app.listen(port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);

});
