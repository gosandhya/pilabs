
var chat = function (appname) {
 this.appname = appname;
};



chat.prototype.appendFunc = function(time, message, nick) {
 // console.log("Hellaaaao, I'm " + this.firstName);

 var a = $('<div class="todo-holder"> <span class="todo">'+new Date(time*1)+' '+message+' '+nick+'</span></div>');


  return $("#pending-todos").append(a);
};



chat.prototype.saveMsg = function(object){

$.ajax({
	    url: 'http://datastore.asadmemon.com/sandhya/chat/'+object.timestamp, 
	    type: 'POST', 
	    contentType: 'application/json', 
	    data: JSON.stringify(object),
	    success:function(res){console.log(res);}
           
	});

};



chat.prototype.getMyData = function(callback)
{

$.get('http://datastore.asadmemon.com/sandhya/chat',function(res){
		console.log(res);
                callback(res);

	});

};



chat.prototype.setint = function()
{

	p1.getMyData(function(res)
	{
		$("#pending-todos").empty();

		for(var i in res)
		{
			p1.appendFunc(i, res[i].msg, res[i].nick);

		}
	})
}



var p1 = new chat("chit chat");

setInterval(p1.setint,1000);



