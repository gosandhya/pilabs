$(function() {


     
	$("#btnAddTodo").click(function(e) {
		var value = $("#txtTodo").val();
		if(value !== "") 
               {
                    var b = $('<div class="todo-holder"><label><input type="checkbox" class="todo-checkbox" data-id="'+arr.length+'"/> <span class="todo">'+value+'</label></div>');

			appendB(arr.length, value, false);
                      

                        arr.push({text:value, state:false})

                         save();
			$("#txtTodo").val("");
		}
	});

      
	$("#txtTodo").keyup(function(e) {
		if(e.keyCode == 13) {
			value = $(this).val();
			if(value != "") {
				$("#btnAddTodo").click();
			}
		}
	});
     

      
	$(document.body).on('click', ".todo-checkbox", function() {
               var dataID = $(this).attr("data-id");
		if($(this).is(":checked")) {
			$(this).next(".todo").css("text-decoration", "line-through");
                        arr[dataID].state = true;
                        save();
                        // console.log(arr[dataID].state);


		} 
                else 
               {
			$(this).next(".todo").css("text-decoration", "none");
                        arr[dataID].state = false;
                        save();
	      }

                      
	});

        
});
