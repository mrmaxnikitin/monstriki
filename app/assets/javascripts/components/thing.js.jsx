const Thing = React.createClass({
  clickHandle: function () {
    this.props.activeThing(this.props.thing, this.props.item, this.props.thing.name)
  },
  render: function() {
    var classActiveThing = 'img-thing-icon'
    if(this.props.active_thing == this.props.item)
      classActiveThing += ' active-thing'
    return (
       <img className={classActiveThing} src={this.props.thing.img} onClick={this.clickHandle}/>
    );
  }
})
