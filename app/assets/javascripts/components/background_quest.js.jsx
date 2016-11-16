const BackgroundQuest = React.createClass({
  //BEGIN***************************************************DECLARE
  getInitialState: function () {
    return null
  },
  backgroundQuest: function(){
    var quest_id_input = ReactDOM.findDOMNode(this.refs.quest_id)
    var url_input = ReactDOM.findDOMNode(this.refs.url)
    var posx_input = ReactDOM.findDOMNode(this.refs.posx)
    var posy_input = ReactDOM.findDOMNode(this.refs.posy)
    var tour_name_input = ReactDOM.findDOMNode(this.refs.tour_name)
    var task_text_color_input = ReactDOM.findDOMNode(this.refs.task_text_color)

    var quest_id = quest_id_input.value.trim(), url = url_input.value.trim(), posx = posx_input.value.trim(), posy = posy_input.value.trim(), tour_name = tour_name_input.value.trim(), task_text_color = task_text_color_input.value.trim() 
    $.ajax({
      url: '/quests/get_background',
      //dataType: 'json',
      type: 'POST',
      data: {
        quest_id: quest_id,
        url: url,
        posx: posx,
        posy: posy,
        tour_name: tour_name,
        task_text_color: task_text_color
      },
      success: function(data) {
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("ОШИБКА", status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className='create-task'>
        <h2>Установление фона на квест</h2>
        <input type="number" ref='quest_id' placeholder='id квеста'/>
        <input type="text" ref='url' placeholder='url background' />
        <input type="text" ref='posx' placeholder='background-position-x'/>
        <input type="text" ref='posy' placeholder='background-position-y'/>
        <br/>
        <input type="text" ref='tour_name' placeholder='Название тура (для контрольного квеста)'/>
        <input type="text" ref='task_text_color' placeholder='task_text_color'/>
        <button className='btn btn-our-red' onClick={this.backgroundQuest}>Установить фон</button>
      </div>
    );
  }
});

