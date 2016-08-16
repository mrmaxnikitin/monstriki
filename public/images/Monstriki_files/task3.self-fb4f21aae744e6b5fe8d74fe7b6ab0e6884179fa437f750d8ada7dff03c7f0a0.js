var Picture3 = React.createClass({
  displayName: "Picture3",

  clickHandler: function () {
    var value_color_id = this.props.color_id + 1;
    if (value_color_id > 4) value_color_id = 0;
    this.props.toAnswer(this.props.item, value_color_id);
  },
  render: function () {
    var classStyle = this.props.classSizePics + " col card";
    var classStylePic;
    switch (this.props.color_id) {
      case 0:
        classStylePic += " color-white";
        break;
      case 1:
        classStylePic += " color-red";
        break;
      case 2:
        classStylePic += " color-blue";
        break;
      case 3:
        classStylePic += " color-green";
        break;
      case 4:
        classStylePic += " color-yellow";
        break;
    }
    return React.createElement(
      "div",
      { className: classStyle, onClick: this.clickHandler },
      React.createElement("img", { className: classStylePic, src: this.props.task_pic })
    );
  }
});

//Раскрасьте предмет
var Task3 = React.createClass({
  displayName: "Task3",

  getInitialState: function () {
    return {
      answer: [0, 0, 0, 0, 0, 0, 0, 0],
      number_of_pics: 8
    };
  },
  componentDidMount: function () {
    var task = this.props.task;
    var number_of_pics = 8;
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
  repeatTask: function () {
    this.props.repeatTask();
    this.setState({
      answer: [0, 0, 0, 0, 0, 0, 0, 0]
    });
  },
  toAnswer: function (item, color_id) {
    //color_id: 0 - белый, 1 - красный,  2 - синий, 3 - зеленый, 4 - желтый
    var a = this.state.answer;
    a[item] = color_id;
    this.setState({
      answer: a
    });
  },
  acceptAnswer: function () {
    var s = new String();
    var number_of_pics = this.state.number_of_pics;
    for (i = 0; i < number_of_pics; i++) {
      s += this.state.answer[i];
    }
    this.props.acceptAnswer(s);
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
      if (i == 1) task_pic_i = task.pic1;else if (i == 2) task_pic_i = task.pic2;else if (i == 3) task_pic_i = task.pic3;else if (i == 4) task_pic_i = task.pic4;else if (i == 5) task_pic_i = task.pic5;else if (i == 6) task_pic_i = task.pic6;else if (i == 7) task_pic_i = task.pic7;else if (i == 8) task_pic_i = task.pic8;
      var the_pic = React.createElement(Picture3, { classSizePics: size_pics, task_pic: task_pic_i, toAnswer: this.toAnswer, color_id: this.state.answer[i - 1], item: i - 1, key: i });
      pics.push(the_pic);
    }

    //Контент самого задания
    content = React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "content-task-type", id: "type_task3" },
        pics,
        React.createElement("div", { className: "clear" })
      )
    );

    //Кнопки действий
    var button_to_answer;
    if (this.props.status_current_task == 0) {
      button_to_answer = React.createElement(
        "button",
        { className: "btn-m btn-m-3 btn-m-3a icon-heart-2 get-answer", onClick: this.acceptAnswer },
        "Ответить"
      );
    }
    var button_next_task, button_to_repeat;
    if (this.props.status_current_task == 1) {
      if (this.props.sum_right_answers != this.props.tasks_length && this.props.quest || !this.props.quest) button_next_task = React.createElement(
        "button",
        { className: "btn-m btn-m-3 btn-m-3e icon-arrow-right next-task", onClick: this.props.nextTask },
        "Следующее задание"
      );
      button_to_repeat = '';
    } else if (this.props.status_current_task == -1) {
      button_next_task = React.createElement(
        "button",
        { className: "btn-m btn-m-3 btn-m-3e icon-arrow-right next-task", onClick: this.props.nextTask },
        "Следующее задание"
      );
      button_to_repeat = React.createElement(
        "button",
        { className: "btn-m btn-m-3 btn-m-3a icon-star-2 repeat-task", onClick: this.repeatTask },
        "Еще разок"
      );
    }

    //Результат выполнения задания
    var result_task;
    if (!this.props.status_current_task) {
      result_task = React.createElement(
        "div",
        null,
        React.createElement(
          "h2",
          null,
          React.createElement(
            "div",
            { className: "col" },
            React.createElement(
              "span",
              { className: "tag tag--light tag--heading tag--heading--h2" },
              task.direction
            )
          ),
          React.createElement("img", { src: "/images/forward.png", className: "img-next-task fr cursor--pointer", onClick: this.props.nextTask })
        ),
        React.createElement("div", { className: "clear" }),
        React.createElement(
          "p",
          { className: "task-text" },
          task.text
        )
      );
    } else if (this.props.status_current_task == 1) {
      result_task = React.createElement(
        "div",
        { className: "card right-task-result result-task animated slideInDown" },
        React.createElement("img", { src: "/images/right_task_result1.png" }),
        React.createElement(
          "h1",
          null,
          "Правильно!"
        )
      );
    } else if (this.props.status_current_task == -1) {
      result_task = React.createElement(
        "div",
        { className: "card wrong-task-result result-task animated slideInDown" },
        React.createElement("img", { src: "/images/wrong_task_result1.png" }),
        React.createElement(
          "h1",
          null,
          "Ошибся! Попробуй еще разок."
        )
      );
    }

    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "col col-main task-participate animated fadeIn" },
        content
      ),
      React.createElement(
        "div",
        { className: "col wrap-task-text ml-2proc" },
        result_task,
        button_to_answer,
        button_to_repeat,
        button_next_task
      )
    );
  }
});