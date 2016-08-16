var Thing = React.createClass({
  displayName: 'Thing',

  clickHandle: function () {
    this.props.activeThing(this.props.thing, this.props.item);
  },
  render: function () {
    var classActiveThing = 'img-thing-icon';
    if (this.props.active_thing == this.props.item) classActiveThing += ' active-thing';
    return React.createElement('img', { className: classActiveThing, src: this.props.thing.img, onClick: this.clickHandle });
  }
});