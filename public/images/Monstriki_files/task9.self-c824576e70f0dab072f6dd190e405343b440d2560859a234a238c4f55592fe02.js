var Picture9 = React.createClass({
  displayName: 'Picture9',

  clickHandler: function () {
    if (this.props.clickable_pic) {
      this.props.toAnswer(this.props.item);
    }
  },
  render: function () {
    var answer = this.props.answer;
    var item = this.props.item;
    var covered = this.props.covered;
    var classStyle = this.props.classSizePics + ' col flip-container';
    if (answer[item] == '1' || !covered) classStyle += ' flip';
    return React.createElement(
      'div',
      { className: classStyle, onClick: this.clickHandler },
      React.createElement(
        'div',
        { className: 'flipper' },
        React.createElement(
          'div',
          { className: 'front card' },
          React.createElement('img', { src: '/images/question_sign.gif' })
        ),
        React.createElement(
          'div',
          { className: 'back card' },
          React.createElement('img', { src: this.props.task_pic })
        ),
        React.createElement('div', { className: 'clear' })
      )
    );
  }
});

//Выбор правильного ответа, кликнув на картинку, ответ только один.
var Task9 = React.createClass({
  displayName: 'Task9',

  getInitialState: function () {
    return {
      answer: '000000000',
      number_of_pics: 9,
      elapsed: 10000, //отвечает за таймер
      covered: true, //переворот картинок
      started: false, //отвечает за кнопку начать и за начало отчета таймера
      start_time: 0, //для корректной работы таймера (разность времени)
      clickable_pic: false //кликабельность картинок, чтобы после неправильного выполнения задания нельзя было изменить ничего
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

    this.setState({
      number_of_pics: number_of_pics
    });
  },
  componentWillUnmount: function () {
    clearInterval(this.timer);
  },
  repeatTask: function () {
    this.props.repeatTask();
    clearInterval(this.timer);
    this.setState({
      answer: '000000000',
      elapsed: 0,
      covered: true,
      started: false,
      start_time: 0,
      clickable_pic: false
    });
  },
  tick: function () {
    if (this.state.elapsed < 0) {
      if (!this.state.covered) {

        this.setState({
          answer: '000000000',
          covered: true,
          clickable_pic: true
        });
      }
    } else {
      this.setState({
        elapsed: 10000 - new Date() + this.state.start_time
      });
    }
  },
  startTask: function () {
    this.timer = setInterval(this.tick, 50);
    this.setState({
      covered: false,
      started: true,
      start_time: Date.now()
    });
  },
  toAnswer: function (item) {
    var number_of_pics = this.state.number_of_pics;
    var task = this.props.task;
    var a = this.state.answer;
    var new_answer = '';
    for (i = 0; i < number_of_pics; i++) {
      if (item == i) {
        if (a[item] == '0') new_answer += '1';else new_answer += '0';
      } else {
        new_answer += a[i];
      }
    }

    //проверка на совпадения правильного ответа. Сравниваю номер кликнутой картинки с номерами указанными при создании вопроса
    var proper = false;
    for (i = 0; i < task.answer.length; i++) {
      if (task.answer[i] == item + 1) {
        proper = true;
        break;
      }
    }

    if (proper) {
      var num_of_1 = 0;
      for (i = 0; i < new_answer.length; i++) {
        if (new_answer[i] == 1) num_of_1++;
      }
      if (num_of_1 == task.answer.length) {
        this.acceptAnswer(task.answer);
        this.setState({
          answer: new_answer,
          clickable_pic: false
        });
      } else {
        this.setState({
          answer: new_answer
        });
      }
    } else {
      this.setState({
        answer: new_answer,
        clickable_pic: false
      });
      this.acceptAnswer(0);
    }
  },
  acceptAnswer: function (answer) {
    this.props.acceptAnswer(answer);
  },
  onDrop: function (data) {
    console.log(data);
  },
  render: function () {
    //Специфика Типа Задания
    var elapsed = Math.round(this.state.elapsed / 1000);
    var seconds = elapsed;

    var task = this.props.task;
    var content;
    var number_of_pics = this.state.number_of_pics;

    //Вывод изображение в зависимости от их количества
    var pics = [];
    var size_pics = "tasks-pics-general tasks-pics-" + number_of_pics;
    for (i = 1; i <= number_of_pics; i++) {
      var task_pic_i;
      if (i == 1) var task_pic_i = task.pic1;else if (i == 2) var task_pic_i = task.pic2;else if (i == 3) var task_pic_i = task.pic3;else if (i == 4) var task_pic_i = task.pic4;else if (i == 5) var task_pic_i = task.pic5;else if (i == 6) var task_pic_i = task.pic6;else if (i == 7) var task_pic_i = task.pic7;else if (i == 8) var task_pic_i = task.pic8;else if (i == 9) var task_pic_i = task.pic9;
      var the_pic = React.createElement(Picture9, { classSizePics: size_pics, task_pic: task_pic_i, toAnswer: this.toAnswer, answer: this.state.answer, covered: this.state.covered, clickable_pic: this.state.clickable_pic, item: i - 1, key: i });
      pics.push(the_pic);
    }

    //Контент самого задания
    content = React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'content-task-type' },
        pics,
        React.createElement('div', { className: 'clear' })
      )
    );

    //Кнопки действий
    var button_to_start, button_to_answer, button_next_task, button_to_repeat;
    if (this.state.started) {
      if (this.props.status_current_task == 0) {
        button_to_answer = React.createElement(
          'button',
          { className: 'btn-m btn-m-3 btn-m-3a icon-heart-2 get-answer', onClick: this.acceptAnswer },
          'Ответить'
        );
      }
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
    } else {
      button_to_start = React.createElement(
        'button',
        { className: 'btn-m btn-m-3 btn-m-3a icon-heart-2', onClick: this.startTask },
        'Начать'
      );
    }

    //Результат выполнения задания
    var result_task;
    if (!this.props.status_current_task) {
      var task_text;
      if (this.state.started && this.state.covered) {
        task_text = task.pic10;
      } else {
        task_text = task.text;
      }
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
          React.createElement(
            'div',
            { className: 'timer col' },
            seconds
          ),
          React.createElement('img', { src: '/images/forward.png', className: 'img-next-task fr cursor--pointer', onClick: this.props.nextTask })
        ),
        React.createElement('div', { className: 'clear' }),
        React.createElement(
          'p',
          { className: 'task-text' },
          task_text
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
      { id: 'type_task9' },
      React.createElement(
        'div',
        { className: 'col col-main task-participate animated fadeIn' },
        content
      ),
      React.createElement(
        'div',
        { className: 'col wrap-task-text ml-2proc' },
        result_task,
        button_to_start,
        button_to_repeat,
        button_next_task
      ),
      React.createElement(
        'div',
        null,
        React.createElement(
          'ul',
          null,
          React.createElement(
            Draggable,
            { type: 'fruit', data: 'banana' },
            React.createElement(
              'li',
              null,
              'Banana'
            )
          ),
          React.createElement(
            Draggable,
            { type: 'fruit', data: 'apple' },
            React.createElement(
              'li',
              null,
              'Apple'
            )
          ),
          React.createElement(
            Draggable,
            { type: 'metal', data: 'silver' },
            React.createElement(
              'li',
              null,
              'Silver'
            )
          )
        ),
        React.createElement(Droppable, {
          types: ['fruit'],
          onDrop: this.onDrop.bind(this) })
      )
    );
  }
});