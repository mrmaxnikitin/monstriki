var QuestTask = React.createClass({
  displayName: 'QuestTask',

  //BEGIN***************************************************DECLARE
  clickHandler: function () {
    // Когда компонент кликнут, вызываем обработчик onClick,
    // который был передан атрибутом при создании:
    this.props.chooseQuestTask(this.props.item);
  },
  render: function () {
    var item = this.props.item;
    var class_choosed_quest_task = 'card mbm element-quest-task';
    if (this.props.num_current_task == item) {
      class_choosed_quest_task += ' choosed_quest_task';
    }

    var content = '';
    if (this.props.status_quest_tasks[item]) {
      class_choosed_quest_task += ' stage_tasks--without-animation';
      content = React.createElement(
        'div',
        { className: class_choosed_quest_task },
        React.createElement('img', { src: '/images/like_finger.png' }),
        React.createElement(
          'div',
          null,
          'Задание ',
          item + 1
        )
      );
    } else {
      class_choosed_quest_task += ' stage_tasks';
      content = React.createElement(
        'div',
        { className: class_choosed_quest_task, onClick: this.clickHandler },
        React.createElement('img', { src: this.props.task.pic1 }),
        React.createElement(
          'div',
          null,
          'Задание ',
          item + 1
        )
      );
    }
    return React.createElement(
      'div',
      null,
      content
    );
  }
});