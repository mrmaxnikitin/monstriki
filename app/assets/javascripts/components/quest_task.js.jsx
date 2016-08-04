const QuestTask = React.createClass({
  //BEGIN***************************************************DECLARE
  clickHandler: function(){   
      // Когда компонент кликнут, вызываем обработчик onClick, 
      // который был передан атрибутом при создании:
      this.props.chooseQuestTask(this.props.item);
  },
  render: function() {
    var item = this.props.item
    var class_choosed_quest_task = 'card mbm'
    if(this.props.num_current_task == item){
      class_choosed_quest_task += ' choosed_quest_task'
    }

    var content = ''
    if(this.props.status_quest_tasks[item]){
      class_choosed_quest_task += ' stage_tasks--without-animation'
      content = (
        <div className={class_choosed_quest_task}>
          <img src='/images/like_finger.png' />
          <div>Задание {item + 1}</div>
        </div>
      );
    }else{
      class_choosed_quest_task += ' stage_tasks'
      content = (
        <div className={class_choosed_quest_task} onClick={this.clickHandler}>
          <img src={this.props.task.pic1} />
          <div>Задание {item + 1}</div>
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
