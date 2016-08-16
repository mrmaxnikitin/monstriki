var Picture6 = React.createClass({
  displayName: 'Picture6',

  clickHandler: function () {
    var new_answer = this.props.answer + 1;
    if (new_answer > this.props.number_of_additional_pics) new_answer = 1;
    this.props.toAnswer(new_answer);
  },
  render: function () {
    var classStyle = this.props.classSizePics + ' col card wrap-pic';
    var the_picture;
    if (this.props.task_pic == 'пусто') {
      var task = this.props.task;
      var src_empty_pic = '/images/question_sign.gif';
      switch (this.props.answer) {
        case 1:
          src_empty_pic = task.pic10;
          break;
        case 2:
          src_empty_pic = task.pic11;
          break;
        case 3:
          src_empty_pic = task.pic12;
          break;
      }
      the_picture = React.createElement('img', { src: src_empty_pic, className: 'cursor--pointer', onClick: this.clickHandler });
    } else {
      the_picture = React.createElement('img', { src: this.props.task_pic });
    }
    return React.createElement(
      'div',
      { className: classStyle },
      the_picture
    );
  }
});

//Последовательность   //1-7 картинок в 1 ряд, 8 картинок в 2 ряда, 9 - в 3 ряда
var Task6 = React.createClass({
  displayName: 'Task6',

  getInitialState: function () {
    return {
      answer: 0,
      number_of_pics: 9,
      number_of_additional_pics: 3
    };
  },
  componentDidMount: function () {
    var task = this.props.task;
    var number_of_pics = 9;
    if (task.pic9 == "") number_of_pics -= 1;
    if (task.pic8 == "") number_of_pics -= 1;
    if (task.pic7 == "") number_of_pics -= 1;
    if (task.pic6 == "") number_of_pics -= 1;
    if (task.pic5 == "") number_of_pics -= 1;
    if (task.pic4 == "") number_of_pics -= 1;
    if (task.pic3 == "") number_of_pics -= 1;
    if (task.pic2 == "") number_of_pics -= 1;
    if (task.pic1 == "") number_of_pics -= 1;

    var number_of_additional_pics = 3;
    if (task.pic12 == "") number_of_additional_pics -= 1;
    if (task.pic11 == "") number_of_additional_pics -= 1;
    if (task.pic10 == "") number_of_additional_pics -= 1;
    this.setState({
      number_of_pics: number_of_pics,
      number_of_additional_pics: number_of_additional_pics
    });
  },
  repeatTask: function () {
    this.props.repeatTask();
    this.setState({
      answer: 0
    });
  },
  toAnswer: function (item) {
    this.setState({
      answer: item
    });
  },
  acceptAnswer: function () {
    var answer = this.state.answer;
    this.props.acceptAnswer(answer);
  },
  render: function () {
    var task = this.props.task;
    var content;
    var number_of_pics = this.state.number_of_pics;

    //Вывод изображение в зависимости от их количества
    var pics = [];
    var size_pics = "tasks-pics-general tasks-pics-" + number_of_pics;
    for (i = 1; i <= number_of_pics; i++) {
      var task_pic_i;
      if (i == 1) var task_pic_i = task.pic1;else if (i == 2) var task_pic_i = task.pic2;else if (i == 3) var task_pic_i = task.pic3;else if (i == 4) var task_pic_i = task.pic4;else if (i == 5) var task_pic_i = task.pic5;else if (i == 6) var task_pic_i = task.pic6;else if (i == 7) var task_pic_i = task.pic7;else if (i == 8) var task_pic_i = task.pic8;else if (i == 9) var task_pic_i = task.pic9;
      var the_pic = React.createElement(Picture6, { classSizePics: size_pics, task: this.props.task, task_pic: task_pic_i, toAnswer: this.toAnswer, number_of_additional_pics: this.state.number_of_additional_pics, answer: this.state.answer, item: i, key: i });
      pics.push(the_pic);
    }

    //Контент самого задания
    content = React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'content-task-type', id: 'type_task1' },
        pics,
        React.createElement('div', { className: 'clear' })
      )
    );

    //Кнопки действий
    var button_to_answer;
    if (this.props.status_current_task == 0) {
      button_to_answer = React.createElement(
        'button',
        { className: 'btn-m btn-m-3 btn-m-3a icon-heart-2 get-answer', onClick: this.acceptAnswer },
        'Ответить'
      );
    }
    var button_next_task, button_to_repeat;
    if (this.props.status_current_task == 1) {
      if (this.props.sum_right_answers != this.props.tasks_length && this.props.quest || !this.props.quest) button_next_task = React.createElement(
        'button',
        { className: 'btn-m btn-m-3 btn-m-3e icon-arrow-right next-task', onClick: this.props.nextTask },
        'Следующее задание'
      );
      button_to_repeat = '';
    } else if (this.props.status_current_task == -1) {
      button_next_task = React.createElement(
        'button',
        { className: 'btn-m btn-m-3 btn-m-3e icon-arrow-right next-task', onClick: this.props.nextTask },
        'Следующее задание'
      );
      button_to_repeat = React.createElement(
        'button',
        { className: 'btn-m btn-m-3 btn-m-3a icon-star-2 repeat-task', onClick: this.repeatTask },
        'Еще разок'
      );
    }

    //Результат выполнения задания
    var result_task;
    if (!this.props.status_current_task) {
      result_task = React.createElement(
        'div',
        null,
        React.createElement(
          'h2',
          null,
          React.createElement(
            'div',
            { className: 'col' },
            React.createElement(
              'span',
              { className: 'tag tag--light tag--heading tag--heading--h2' },
              task.direction
            )
          ),
          React.createElement('img', { src: '/images/forward.png', className: 'img-next-task fr cursor--pointer', onClick: this.props.nextTask })
        ),
        React.createElement('div', { className: 'clear' }),
        React.createElement(
          'p',
          { className: 'task-text' },
          task.text
        )
      );
    } else if (this.props.status_current_task == 1) {
      result_task = React.createElement(
        'div',
        { className: 'card right-task-result result-task animated slideInDown' },
        React.createElement('img', { src: '/images/right_task_result1.png' }),
        React.createElement(
          'h1',
          null,
          'Правильно!'
        )
      );
    } else if (this.props.status_current_task == -1) {
      result_task = React.createElement(
        'div',
        { className: 'card wrong-task-result result-task animated slideInDown' },
        React.createElement('img', { src: '/images/wrong_task_result1.png' }),
        React.createElement(
          'h1',
          null,
          'Ошибся! Попробуй еще разок.'
        )
      );
    }

    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'col col-main task-participate animated fadeIn' },
        content
      ),
      React.createElement(
        'div',
        { className: 'col wrap-task-text ml-2proc' },
        result_task,
        button_to_answer,
        button_to_repeat,
        button_next_task
      )
    );
  }
});