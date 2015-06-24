//this is controller

var controllerClass = function () {
 
};



controllerClass.prototype.newMessage = function(email, subject, index)
{

view.render(email, subject, index);


}

controllerClass.prototype.saveMessage = function(object)
{
	console.log(object);

model.saveMsg(object);


}



controllerClass.prototype.ClickedMessage = function(index,callback)
{
	model.fullMessage(index,function (result)
	{
		//console.log(result.msg);
        callback(result);
	})
}



controllerClass.prototype.deleteMessage = function(index,callback)
{

model.delMessage(index,function (result)
	{
		console.log("chal gayaa" + " ",result.msg);
        callback(result);
	})
}


var controller = new controllerClass();