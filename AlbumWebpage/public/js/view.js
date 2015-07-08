
var vieww = function () {
//var that;
};

//vieww.prototype.appendFunc()

vieww.prototype.render = function(email, subject, index, timestamp)

{

 var foo = "<hr/>";
 var newlinee = "<br>";
 var spacee = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'

 var trash =  '<div class="trashBox"> <span class="glyphicon glyphicon-trash"></span></div>';
 var a = $('<div class="todo-holder"> <span class="todo"> '+email+' '+newlinee+' '+spacee+' '+trash+'  '+subject+' '+foo+'  </span></div>');

a.attr("data-index",index);
a.find(".trashBox").attr("data-index",index);


  return $("#inbox").append(a);


};



vieww.prototype.buttonTodo = function()
{

	    var mesg = $("#message").val();
		var subject = $("#subject").val();
		var email = $("#email").val();

		if(mesg !== "") 

               {
               	 
                        //view.render(timestamp1, mesg, nickk);
                        controller.saveMessage({remail:email, rsubject:subject, msg:mesg});

			            $("#message").val("");
			            
		       }

		      location.href = "/inbox.html";
}



vieww.prototype.repButtonTodo = function()
{
//var currentIndex = $(this).attr("data-index");
	    var mesg = $("#reply").val();
		var subject = $("#subText").val();
		var email = $("#mesg2").val();

console.log(mesg);
console.log(subject);
console.log(email);

		if(mesg !== "") 

               {
               	 
                        //view.render(timestamp1, mesg, nickk);
                        controller.saveMessage({remail:email, rsubject:subject, msg:mesg});

			            $("#reply").val("");
			            
		       }

		      // location.href = "/inbox.html";
}



var view = new vieww();
$(function() {


	$("#sendButton").click(view.buttonTodo);
	//$("#typeMsg").keyup(j1.typeMessage);

	$("#replyButton").click(view.repButtonTodo);

        
});




/*window.onload = function(){


 document.getElementById("person").innerHTML = "Item was changed";
}
*/

$(document.body).on('click', ".todo-holder", function() 
{
	console.log("this" + " ",this);
	
var currentIndex = $(this).attr("data-index");
console.log("indeex" + " ", currentIndex);

var a = controller.ClickedMessage(currentIndex,function(a)
	{
		$("mesg1").text = a.msg;

		document.getElementById("mesg1").innerHTML=a.msg;
		//document.getElementById("mesg1").text = a.msg;
		document.getElementById("mesg2").value = a.from;
		document.getElementById("subText").value = a.rsubject;
		document.getElementById("forTime").value = new Date(a.timestampp);



	});
//that = this;
          
});


$(document.body).on('click', ".trashBox", function() 
{
		//console.log("that" + " ",that);
	var currentIndex = $(this).attr("data-index");
//console.log("tarshindex" + " " ,currentIndex);

var a = controller.deleteMessage(currentIndex,function(a)
{
 console.log("print" + " ",a.msg);
});


});
