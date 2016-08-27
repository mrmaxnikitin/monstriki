const ProfileBig = React.createClass({
  render: function() {
    var score = this.props.score
    var monster_name = this.props.monster_name
    var monster_avatar = this.props.monster_avatar
    return (
      <div className='col col-press-18 col-profile'>
        <div className='card mbm profile-card'>
          <div className='character'>
            <img src={monster_avatar} />
          </div>
          <div className='satiety twsb'>
            <div className='name tcmc'>
              <span>{monster_name}</span>
              <a className='coins fr tcm'>
                <img src='/images/coin.png' /> {score}
              </a>
            </div>
          </div>
          <div className='profile-link bdrn bdrt bc-snow-light card-row card-row--south'>
            Мой профиль
          </div>
        </div>
        <div className='card mbl profile-menu'>
          <ul>
            <li className='menu-item'>
              <a className='list-item-link menu-item-link'>Друзья</a>
            </li>
            <li className='menu-item'>
              <a className='list-item-link menu-item-link'>Стикеры</a>
            </li>
            <li className='menu-item'>
              <a className='list-item-link menu-item-link'>Платежи</a>
            </li>
            <li className='menu-item'>
              <a className='list-item-link menu-item-link'>Настройки</a>
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
