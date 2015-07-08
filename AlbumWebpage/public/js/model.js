var modelClass = function (appname) {
 this.appname = appname;

};





modelClass.prototype.saveMsg = function(object){

$.ajax({
	    url: '/compose2', 
	    type: 'POST', 
	    contentType: 'application/json', 
	    data: JSON.stringify(object),
	    success:function(res){console.log(res);}
           
	});

};



modelClass.prototype.getMyData = function(callback)
{

var that = this;
$.get('/inbox',function(res){
		//console.log(res);
		that.allMessages = res;
                callback(res);

	});

};


modelClass.prototype.getMyDataForDelete = function(index)
{

//var that = this;

};





modelClass.prototype.delMessage = function(index, callback)
{
	

$.get('/delete/'+index , function(res){
		console.log("print res in delere"+ " ",res);
		//this.messageToDelete = res;
                callback(res);

	});

		
}





var model = new modelClass("chit chat");

model.getMyData(function(res)
{

        document.getElementById("mesg1").value = res[res.length-1].msg;
		document.getElementById("mesg2").value = res[res.length-1].from;
		document.getElementById("subText").value = res[res.length-1].rsubject;
		document.getElementById("forTime").value = new Date(res[res.length-1].timestampp);

for( var i=res.length-1; i>=0; i--)
	if(res[i].isDeleted != true)

{
	console.log("i" + " ", i);

	controller.newMessage(res[i].from, res[i].rsubject, i);
	// var foo = "<hr>";
      //$("#inbox").after(foo);
}



});

modelClass.prototype.fullMessage = function(index, callback)
{
	
	callback(this.allMessages[index]);

		
}





