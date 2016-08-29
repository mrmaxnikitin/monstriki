const Ground = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    get_things_url: React.PropTypes.string.isRequired
  },
  getInitialState: function () {
    return {
      things_count: 10,
      things: [],
      active_thing: -1,
      activate_lamp: 0
    };
  },
  componentDidMount: function() {
    this.loadTasksFromServer();
  },
  componentWillUnmount: function(){
  },
  loadTasksFromServer: function() {
    $.ajax({
      url: this.props.get_things_url,
      dataType: 'json',
      data: {
        count: this.state.things_count
      },
      cache: false,
      success: function(data) {
        this.setState({
          things: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("Ошибка", status, err.toString());
      }.bind(this)
    });
  },
  activeThing: function(thing, item) {
    $.ajax({
      url: '/user_things/active_thing',
      //dataType: 'json',
      type: 'POST',
      data: {
        id:     thing.user_thing_id,
        active: true
      },
      success: function(data) {
        this.setState({
          active_thing: item
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("ОШИБКА1", status, err.toString());
      }.bind(this)
    });
  },
  activateLamp: function() {
    if(!this.state.activate_lamp){
      $('body').css('background', 'url(/images/background-stars.png) repeat') 
      $('body').css('background-size', 'cover')
      $('.hat').css('background', 'rgba(255,255,255,0)').css('border-bottom', 'none')
      $('.hat #header-logo span').css('color', 'white')
      this.setState({
        activate_lamp: 1
      });
    }else{
      $('body').css('background', 'url(/images/background1.jpg)')
      $('body').css('background-size', 'cover')
      $('.hat').css('background', 'rgba(255,255,255,1)').css('border-bottom', '1px solid rgba(0, 0, 0, 0.1)')
      $('.hat #header-logo span').css('color', '#393d40')
      this.setState({
        activate_lamp: 0
      });
    }
  },
  render: function() {
    things = this.state.things.map(function (thing, i) {
      return (
        <Thing
          key={i}
          item={i}
          active_thing={this.state.active_thing}
          thing={thing}
          activeThing={this.activeThing} />
      );
    }.bind(this));
    var content_thing
    if(this.state.active_thing == 0){  //Cветильник
      content_thing = (
        <div className='flashlight'>
          <img src='/images/things/lamp_c.png' className='animated slideInDown' onClick={this.activateLamp}/>
        </div>
      );
    }
    return (
      <div>
        <div>
          {things}
        </div>
          {content_thing}
      </div>
    );
  }
});

