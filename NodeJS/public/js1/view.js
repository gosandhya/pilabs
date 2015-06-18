
var vieww = function () {

};

//vieww.prototype.appendFunc()

vieww.prototype.render = function(time, message,nick)

{

 var a = $('<div class="todo-holder"> <span class="todo">'+new Date(time*1)+' '+message+' '+nick+'</span></div>');
  return $("#pending-todos").append(a);

};



vieww.prototype.buttonTodo = function()

{

	    var mesg = $("#typeMsg").val();
		var nickk = $("#nick").val();
		var timestamp1 = new Date().getTime();

		if(mesg !== "") 
               {
               	 
                        //view.render(timestamp1, mesg, nickk);
                        controller.saveMessage({timestamp:timestamp1, msg:mesg, nick:nickk});

			            $("#typeMsg").val("");
			            
		       }
		      
}



var view = new vieww();
$(function() {


	$("#btnAddTodo").click(view.buttonTodo);
	//$("#typeMsg").keyup(j1.typeMessage);

        
});









