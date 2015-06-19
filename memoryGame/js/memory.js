
var memoryy = function (appname) {
 this.appname = appname;
};

var tiles_flipped = 0;
var mem_value = [];
var memory_tile_ids = [];
var flip = false;
function random()
{

var randomNum = Math.floor(Math.random() * 17);
  //  var actualNum = randomNum + 1;
  return randomNum;
}


//arrays

var arr= [];

for(var i=0; i<6; i++)
{
	arr[i]=random();
}


var arr1= [];
var x=0;
for(var i=0; i<6; i++)
{
arr1[i]= arr[i];

}

for(var i=6; i<12; i++)
{
arr1[i]= arr[x];
x++;

}

//shuffle array
function shuffleArray() {
    for (var i = arr1.length - 1; i>=0; i--) 
    {
        var j = Math.floor(Math.random() * 13);
        var temp = arr1[i];
        arr1[i] = arr1[j];
        arr1[j] = temp;
    }
    return arr1;
}




//final array
 var finalArray = shuffleArray();


for(var i=0; i<12; i++)
{
	console.log(finalArray[i]);
}



for(var i=0; i<12; i++)
{
var y = document.getElementById(i);
y.innerHTML = finalArray[i];

}



memoryy.prototype.FlipTile = function()
{

	if(mem_value.length < 2)
	{
		$(this).css("background-color","red");
		
		 if(mem_value.length == 0)
		 {
		 	mem_value.push($(this).text());
		 	memory_tile_ids.push(this.id);
		 	console.log("text 0-" + " " + $(this).text());
		 	console.log("index 0-" + " " + this.id);
		 }

		 else if(mem_value.length == 1)
		 {
		 	mem_value.push($(this).text());
		 	memory_tile_ids.push(this.id);
		    console.log("text 1-" + " " + $(this).text());
		 	console.log("index 1-" + " " + this.id);


		 if(mem_value[0] == mem_value[1])
		 {
		 	//tiles_flipped +=2;
		 	//flip = false;

		 	//console.log("tile flipped" + tiles_flipped);
		 	mem_value = [];
		 	memory_tile_ids = [];

		 	console.log('yahoo');
		 }

		 else
		 {
		 	function flipBack()
		 	{
		 		 var tile_1 = document.getElementById(memory_tile_ids[0]);
				 var tile_2 = document.getElementById(memory_tile_ids[1]);

				 console.log("tile1" + " " ,tile_1);
				  console.log("tile2" + " ",tile_2);
				 //tile_1.css("background-color", "orange");
				 //tile_2.css("background-color", "orange");
				  tile_1.style.backgroundColor = 'white';
				 // x[0].style.backgroundColor = "yellow"
            	 //   tile_1.innerHTML = "";
				   tile_2.style.backgroundColor= 'white';
            	   // tile_2.innerHTML = "";
				    // Clear both arrays
				   // memory_values = [];
            	   // memory_tile_ids = [];
		 	}
		 	 setTimeout(flipBack, 700);
		 	      
		    }

		}

	}
}

$('#myTable td').css("color","white");
//int i=0;

//var k=2;

//while(k>0){
memoryy.prototype.clickCell = function()
{

		 $(this).css("background-color","red");

		// var idd = getTableId(myTable);
		//$(this).text(random());

	//	var y = document.getElementById(i);
         //idd.innerHTML = actualNum;
        // var y = document.getElementById('myTable')
        // y.innerHTML = actualNum;

}
//k++;

//}

var m1 = new memoryy("Memory Game");

$(function() 
{

 $("#myTable td").click(m1.FlipTile)
 //console.log("12 times");

 	//FlipTile(this,finalArray[i]));

});


/*window.setInterval(function()
{
	if(flip === true){
 $("#myTable td").css("background-color","white");
}

}

, 2000);*/
      