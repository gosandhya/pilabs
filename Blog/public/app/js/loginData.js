var loginData = function () {

};


loginData.prototype.buttonTodo = function()
{
	var usernamee = $("#name").val();
	var passwordd = $("#pass").val();

	
                        console.log(usernamee);
                        console.log(passwordd);
			     }

var login = new loginData();
$(function() {


	$("#loginButton").click(login.buttonTodo);
	//$("#typeMsg").keyup(j1.typeMessage);

        
});