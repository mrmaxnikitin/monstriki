const Profile = React.createClass({
  render: function() {
    var score = this.props.score
    return (
      <div className='col col-press-18 col-profile'>
        <div className='card mbm profile-card'>
          <div className='character col col-press-30'>
            <img src='/images/monsters/monster3.gif' />
          </div>
          <div className='satiety twsb col col-press-70'>
            <div className='name tcmc'>
              <span>Жутик-сука</span>
              <div className='coins tcm'>
                <img src='/images/coin.png' /> {score}
              </div>
            </div>
          </div>
          <div className='clear'></div>
          <div className='profile-link bdrn bdrt bc-snow-light card-row card-row--south'>
            <a className='tcm'>Мой профиль</a>
          </div>
        </div>
        <div className='card mbl profile-menu'>
          <ul>
            <li className='menu-item'>
              <a className='list-item-link menu-item-link'>Друзья</a>
            </li>
            <li className='menu-item'>
              <a className='list-item-link menu-item-link'>Бубуки</a>
            </li>
            <li className='menu-item'>
              <a className='list-item-link menu-item-link'>Платежи</a>
            </li>
            <li className='menu-item'>
              <a className= 'list-item-link menu-item-link'>Настройки</a>
            </li>
            <li className='menu-item'>
              <a className='list-item-link menu-item-link'>Выход</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
})

