
var Thumbnail = require('./thumbnail');

var ThumbnailGrid = React.createClass
    ({

  
      render: function()

      {

        var arr=this.props.src;
        //var arr1 = this.props.cap;

        var newarr = arr.map(function(element){

          return <Thumbnail src={element.url} cap={element.caption}/>
        });

         // console.log("array" + " ",arr);
        return(


         <div> {newarr} </div>


          );
      },

    

    });

module.exports = ThumbnailGrid;
