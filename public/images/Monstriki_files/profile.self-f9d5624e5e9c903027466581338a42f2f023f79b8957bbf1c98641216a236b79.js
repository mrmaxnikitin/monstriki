var Profile = React.createClass({
  displayName: 'Profile',

  render: function () {
    var score = this.props.score;
    return React.createElement(
      'div',
      { className: 'col col-press-18 col-profile' },
      React.createElement(
        'div',
        { className: 'card mbm profile-card' },
        React.createElement(
          'div',
          { className: 'character col col-press-30' },
          React.createElement('img', { src: '/images/monsters/monster3.gif' })
        ),
        React.createElement(
          'div',
          { className: 'satiety twsb col col-press-70' },
          React.createElement(
            'div',
            { className: 'name tcmc' },
            React.createElement(
              'span',
              null,
              'Жутик-сука'
            ),
            React.createElement(
              'div',
              { className: 'banana tcm' },
              score,
              ' score'
            )
          )
        ),
        React.createElement('div', { className: 'clear' }),
        React.createElement(
          'div',
          { className: 'profile-link bdrn bdrt bc-snow-light card-row card-row--south' },
          React.createElement(
            'a',
            { className: 'tcm' },
            'Мой профиль'
          )
        )
      ),
      React.createElement(
        'div',
        { className: 'card mbl profile-menu' },
        React.createElement(
          'ul',
          null,
          React.createElement(
            'li',
            { className: 'menu-item' },
            React.createElement(
              'a',
              { className: 'list-item-link menu-item-link' },
              'Друзья'
            )
          ),
          React.createElement(
            'li',
            { className: 'menu-item' },
            React.createElement(
              'a',
              { className: 'list-item-link menu-item-link' },
              'Бубуки'
            )
          ),
          React.createElement(
            'li',
            { className: 'menu-item' },
            React.createElement(
              'a',
              { className: 'list-item-link menu-item-link' },
              'Платежи'
            )
          ),
          React.createElement(
            'li',
            { className: 'menu-item' },
            React.createElement(
              'a',
              { className: 'list-item-link menu-item-link' },
              'Настройки'
            )
          ),
          React.createElement(
            'li',
            { className: 'menu-item' },
            React.createElement(
              'a',
              { className: 'list-item-link menu-item-link' },
              'Выход'
            )
          )
        )
      )
    );
  }
});