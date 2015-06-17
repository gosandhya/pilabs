
var modelClass = function (appname) {
 this.appname = appname;
 this.lastTimeStamp = 0;
};


/*
chat.prototype.appendFunc = function(time, message, nick) {
 // console.log("Hellaaaao, I'm " + this.firstName);

 var a = $('<div class="todo-holder"> <span class="todo">'+new Date(time*1)+' '+message+' '+nick+'</span></div>');


  return $("#pending-todos").append(a);
};
*/


modelClass.prototype.saveMsg = function(object){

$.ajax({
	    url: 'http://datastore.asadmemon.com/sandhya/chat/'+object.timestamp, 
	    type: 'POST', 
	    contentType: 'application/json', 
	    data: JSON.stringify(object),
	    success:function(res){console.log(res);}
           
	});

};



modelClass.prototype.getMyData = function(callback)
{

$.get('http://datastore.asadmemon.com/sandhya/chat',function(res){
		console.log(res);
                callback(res);

	});

};



modelClass.prototype.setint = function()
{
	//var that = this;
	//debugger;

	model.getMyData(function(res)
	{
		//$("#pending-todos").empty();

		for(var i in res)
		{
			//debugger;
			//p1.appendFunc(i, res[i].msg, res[i].nick);
			//v1.render(i, res[i].msg, res[i].nick);
			if(i > model.lastTimeStamp)
			{
			controller.newMessage(i, res[i].msg, res[i].nick);
		}
		}

		model.lastTimeStamp = i;
	})
}



var model = new modelClass("chit chat");

setInterval(model.setint,1000);



