 

 var Thumbnail = React.createClass({
        render: function(){
          console.log(this.props.src);
            return (
              
                <div className="col-xs-6 col-sm-4 col-md-3 contain">
                
           
                 <img src={this.props.src} id="thumbnailImage" />
               
                   <h4>{this.props.cap} </h4> 

                 </div>
                 
            );
        }


    });


 module.exports = Thumbnail;