//var p1 = new Person("Alice");

var jqueryClass = function (appname1) {
 this.appname1 = appname1;
};



jqueryClass.prototype.buttonTodo = function()

{

	var mesg = $("#typeMsg").val();
		var nickk = $("#nick").val();
		var timestamp1 = new Date().getTime();

		if(mesg !== "") 
               {
                        p1.appendFunc(timestamp1, mesg, nickk);
                        p1.saveMsg({timestamp:timestamp1, msg:mesg, nick:nickk});

			            $("#typeMsg").val("");
		       }
		      
}

jqueryClass.prototype.typeMessage = function(e)

{
	if(e.keyCode == 13) 
	{
			mesg = $(this).val();
			if(mesg != "") 
			{
				$("#btnAddTodo").click();
			}
	}

}

var j1 = new jqueryClass("chit chat1");



$(function() {


	$("#btnAddTodo").click(j1.buttonTodo);
	$("#typeMsg").keyup(j1.typeMessage);

        
});
