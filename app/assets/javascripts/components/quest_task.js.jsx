const QuestTask = React.createClass({
  //BEGIN***************************************************DECLARE
  clickHandler: function(){   
      // Когда компонент кликнут, вызываем обработчик onClick, 
      // который был передан атрибутом при создании:
      this.props.chooseQuestTask(this.props.item);
  },
  render: function() {
    var item = this.props.item
    var class_choosed_quest_task = 'card mbs element-quest-task'
    if(this.props.num_current_task == item){
      class_choosed_quest_task += ' choosed_quest_task'
    }

    var content = ''
    if(this.props.status_quest_tasks[item]){
      class_choosed_quest_task += ' stage_tasks--without-animation'
      content = (
        <div className={class_choosed_quest_task}>
          <img src='/images/like_finger.png' />
        </div>
      );
    }else{
      class_choosed_quest_task += ' stage_tasks'
      var direction_pic
      if(this.props.task.direction == 'Логика'){
        direction_pic = '/images/direction_pics/logic.jpg'
      }else if(this.props.task.direction == 'Память и внимание'){
        direction_pic = '/images/direction_pics/memory.jpg'
      }else if(this.props.task.direction == 'Речь'){
        direction_pic = '/images/direction_pics/speech.jpg'
      }else if(this.props.task.direction == 'Математика'){
        direction_pic = '/images/direction_pics/math.jpg'
      }else if(this.props.task.direction == 'Мир вокруг нас'){
        direction_pic = '/images/direction_pics/world.jpg'
      } 
      content = (
        <div className={class_choosed_quest_task} onClick={this.clickHandler}>
          <img src={direction_pic} />
        </div>
      );
    }
    return (
      <div>
        {content}
      </div>
    );
  }
})
