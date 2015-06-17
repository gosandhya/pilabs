
var memoryy = function (appname) {
 this.appname = appname;
};


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


$('#myTable td').css("color","white");
//int i=0;
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

var m1 = new memoryy("Memory Game");

$(function() 
{
 $("#myTable td").click(m1.clickCell)

});


window.setInterval(function()
{
 $("#myTable td").css("background-color","white");

}

, 1000);
      