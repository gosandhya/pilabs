


function appendB(lengthh, value, state)
{

var a = $('<div class="todo-holder"><label><input type="checkbox" class="todo-checkbox" data-id="'+lengthh+'"/> <span class="todo">'+value+'</label></div>');

if(state == true) 
                      {
			a.find(".todo").css("text-decoration", "line-through");    
                        a.find(".todo-checkbox").prop("checked",true)

                       // return $("#pending-todos").append(a);
                      } 

                      return $("#pending-todos").append(a);
                 }



function save(){
$.ajax({
	    url: 'http://datastore.asadmemon.com/sandhya/pilabs', 
	    type: 'POST', 
	    contentType: 'application/json', 
	    data: JSON.stringify(arr),
	    success:function(res){console.log(res);}
            
           //console.log("hogaaya");

	});

}

function getMyData(callback)
{

$.get('http://datastore.asadmemon.com/sandhya/pilabs',function(res){
		console.log(res);
                callback(res);


	});
}


