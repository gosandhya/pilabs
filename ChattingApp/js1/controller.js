//this is controller

var controllerClass = function () {
 
};



controllerClass.prototype.newMessage = function(time, message, nick)
{

view.render(time, message, nick);


}

controllerClass.prototype.saveMessage = function(object)
{

model.saveMsg(object);


}

var controller = new controllerClass();