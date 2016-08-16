var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Demo = React.createClass({
  displayName: 'Demo',

  getInitialState: function () {
    return {
      items: [{ key: 'a', size: 10 }, { key: 'b', size: 20 }, { key: 'c', size: 30 }]
    };
  },
  componentDidMount: function () {
    this.setState({
      items: [{ key: 'a', size: 10 }, { key: 'b', size: 20 }] });
  },
  // remove c.
  willLeave: function () {
    // triggered when c's gone. Keeping c until its width/height reach 0.
    return { width: spring(0), height: spring(0) };
  },
  render: function () {
    return React.createElement(
      TransitionMotion,
      {
        willLeave: this.willLeave,
        styles: this.state.items.map(function (item) {
          return {
            key: item.key,
            style: { width: item.size, height: item.size }
          };
        }) },
      function (interpolatedStyles) {
        return(
          // first render: a, b, c. Second: still a, b, c! Only last one's a, b.
          React.createElement(
            'div',
            null,
            interpolatedStyles.map(function (config) {
              return React.createElement('div', { key: config.key, style: _extends({}, config.style, { border: '1px solid' }) });
            })
          )
        );
      }
    );
  }
});