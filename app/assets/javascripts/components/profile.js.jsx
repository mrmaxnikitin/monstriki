const Profile = React.createClass({
  render: function() {
    var score = this.props.score
    var monster_name = this.props.monster_name
    var monster_avatar = this.props.monster_avatar + ".gif"
    return (
      <div className='col col-press-18 col-profile'>
        <div className='card mbm profile-card'>
          <div className='character col col-press-30'>
            <img src={monster_avatar} />
          </div>
          <div className='satiety twsb col col-press-70'>
            <div className='name tcmc'>
              <span>{monster_name}</span>
              <div className='coins tcm'>
                <img src='/images/coin.png' /> {score}
              </div>
            </div>
          </div>
          <div className='clear'></div>
          <div className='profile-link bdrn bdrt bc-snow-light card-row card-row--south'>
            <a href={this.props.profile_link} className='tcm'>Мой профиль</a>
          </div>
        </div>
        <div className='card mbl profile-menu'>
          <ul>
            <li className='menu-item'>
              <a href={this.props.setting_link} className= 'list-item-link menu-item-link'>Настройки</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
})

const UnknownProfile = React.createClass({
  render: function() {
    return (
      <div className='col col-press-18 col-profile profile-big'>
        <div className='card mbm profile-card'>
          <div className='character'>
            <img src='/images/stranger-toys.jpg' />
            <a href='/signup' className = 'butn medium green rounded w--100 mbs'>Регистрация</a>
          </div>
        </div>
      </div>
    );
  }
})
