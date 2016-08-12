const Profile = React.createClass({
  render: function() {
    var score = this.props.score
    return (
      <div className='col col-press-18 col-profile'>
        <div className='card mbm profile-card'>
          <div className='character'>
            <img src='/images/monsters/monster3.gif' />
          </div>
          <div className='satiety twsb'>
            <div className='name tcmc'>
              <span>Жутик-сука</span>
              <a className='banana fr tcm'>
                {score} score
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
