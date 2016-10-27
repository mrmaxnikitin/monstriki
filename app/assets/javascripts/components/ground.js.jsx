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
      lamp: 0,
      drunk: 0,
      swing: 0,
      sepia: 0,
      kaleidoscope: 0,
      invert: 0
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
  activeThing: function(thing, item, name) {
    var active_thing
    if(this.state.active_thing == item){
      active_thing = -1
    }else{
      active_thing = item
    }

    if(name == 'День-ночь'){                  //lamp Светильник
      this.setState({
        active_thing: active_thing
      });
    }

    if(name == 'Гипноз'){                  //drunk Размытие экрана
      this.drunk(item)
    }

    if(name == 'Качели'){                  //swing
      this.swing(item)
    }

    if(name == 'Билет в прошлое'){                  //sepia
      this.sepia(item)
    }

    if(name == 'Калейдоскоп'){
      this.kaleidoscope(item)       //kaleidoscope
    }

    if(name == 'Призма'){
      this.invert(item)       //invert
    }
    

   /* $.ajax({
      url: '/user_things/active_thing',
      //dataType: 'json',
      type: 'POST',
      data: {
        id:     thing.user_thing_id,
        active: switch_thing
      },
      success: function(data) {
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("ОШИБКА1", status, err.toString());
      }.bind(this)
    });*/
  },
  switchLamp: function() {
    if(!this.state.lamp){
      $('.div-body').css('background', 'url(/images/background-stars.png) repeat') 
      $('.div-body').css('background-size', 'cover')
      $('.hat').css('background', 'rgba(255,255,255,0)').css('border-bottom', 'none')
      $('.hat #header-logo span').css('color', 'white')
      this.setState({
        lamp: 1
      });
    }else{
      $('.div-body').css('background', 'url(/images/background1.jpg)')
      $('.div-body').css('background-size', 'cover')
      $('.hat').css('background', 'rgba(255,255,255,1)').css('border-bottom', '1px solid rgba(0, 0, 0, 0.1)')
      $('.hat #header-logo span').css('color', '#393d40')
      this.setState({
        lamp: 0
      });
    }
    /*$(".card").circulate({
      speed: 400,                  // Speed of each quarter segment of animation, 1000 = 1 second
      height: 200,                 // Distance vertically to travel
      width: 200,                  // Distance horizontally to travel
      sizeAdjustment: 100,         // Percentage to grow or shrink
      loop: false,                 // Circulate continuously
      zIndexValues: [1, 1, 1, 1]   // Sets z-index value at each stop of animation
    });*/
  },
  drunk: function(item) {
    var status, active_item
    if(!this.state.drunk){
      $('body').addClass('drunk')
      status = 1
      active_item = item
    }else{
      $('body').removeClass('drunk')
      status = 0
      active_item = -1
    }

    this.setState({
      active_thing: active_item,
      drunk: status
    });
  },
  swing: function(item) {
    var status, active_item
    if(!this.state.swing){
      $('body').addClass('tossing')
      $('div').addClass('tossing1')
      $('img').addClass('tossing1')
      status = 1
      active_item = item
    }else{
      $('body').removeClass('tossing')
      $('div').removeClass('tossing1')
      $('img').removeClass('tossing1')
      status = 0
      active_item = -1
    }

    this.setState({
      active_thing: active_item,
      swing: status
    });
  },
  sepia: function(item) {
    var status, active_item
    if(!this.state.sepia){
      $('body').addClass('sepia')
      status = 1
      active_item = item
    }else{
      $('body').removeClass('sepia')
      status = 0
      active_item = -1
    }

    this.setState({
      active_thing: active_item,
      sepia: status
    });
  },
  kaleidoscope: function(item) {
    var status, active_item
    if(!this.state.kaleidoscope){
      $('body').addClass('kaleidoscope')
      status = 1
      active_item = item
    }else{
      $('body').removeClass('kaleidoscope')
      status = 0
      active_item = -1
    }

    this.setState({
      active_thing: active_item,
      kaleidoscope: status
    });
  },
  invert: function(item) {
    var status, active_item
    if(!this.state.invert){
      $('body').addClass('invert')
      status = 1
      active_item = item
    }else{
      $('body').removeClass('invert')
      status = 0
      active_item = -1
    }

    this.setState({
      active_thing: active_item,
      invert: status
    });
  },
  render: function() {
    things = this.state.things.map(function (thing, i) {
      return (
        <Thing
          key={i}
          item={thing.thing_id}
          active_thing={this.state.active_thing}
          thing={thing}
          activeThing={this.activeThing} />
      );
    }.bind(this));
    var content_thing
    if(this.state.active_thing == 1){  //Cветильник
      content_thing = (
        <div className='flashlight'>
          <img src='/images/things/lamp_c.png' className='animated slideInDown' onClick={this.switchLamp}/>
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

