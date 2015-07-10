
var ThumbnailGrid = require('./ThumbnailGrid');
var MyComponent = React.createClass({
        render: function(){
         
            return (

                <div className="container" >
                <div id="absolute">
                <form >
                <input type="text" placeholder="Your URL" ref="url"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" placeholder="Caption" ref="caption"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="button"  onClick={this.urlChange} value="Submit"/>
                 <hr/>
                </form>
                </div>

                <ThumbnailGrid src={this.state.list} />
                

              </div>
            );
   },


 getInitialState: function(){
          return {
            list:[],
            
            // arr:[]
          }
        },

     urlChange: function(event)

        {
      var that=this;

          
          var url = React.findDOMNode(this.refs.url).value;
          var caption = React.findDOMNode(this.refs.caption).value;
        //  this.setState({name:url})

    

     $.ajax({
      url: '/data', 
      type: 'POST', 
      contentType: 'application/json', 
      data:JSON.stringify({url:url, caption:caption}),
      success: function(){

        $.get('/data',function(res){
           that.setState({list:res});
               

  });
      }
     
  });           
                
 },


      componentDidMount: function()
      {
        var that=this;
        $.get('/data',function(res){
           that.setState({list:res});

                //callback(res);
                //arr = res;

  });
      }
      
});
module.exports = MyComponent;
