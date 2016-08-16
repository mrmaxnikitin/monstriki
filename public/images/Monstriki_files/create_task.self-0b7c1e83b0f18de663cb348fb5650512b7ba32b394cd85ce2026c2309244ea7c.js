var CreateTask = React.createClass({
  displayName: 'CreateTask',

  //BEGIN***************************************************DECLARE
  getInitialState: function () {
    return {
      task_type: 1,
      subtype: 1
    };
  },
  selectTypeTask: function () {
    var task_type = ReactDOM.findDOMNode(this.refs.task_type);
    this.setState({
      task_type: task_type.value
    });
  },
  selectSubtype: function () {
    var subtype = ReactDOM.findDOMNode(this.refs.subtype);
    this.setState({
      subtype: subtype.value
    });
  },
  createTask1: function () {
    var direction_input = ReactDOM.findDOMNode(this.refs.direction);
    var age_input = ReactDOM.findDOMNode(this.refs.age);
    var text_input = ReactDOM.findDOMNode(this.refs.text);
    var for_quest_input = ReactDOM.findDOMNode(this.refs.for_quest);
    var direction = direction_input.value.trim(),
        age = age_input.value.trim(),
        text = text_input.value.trim(),
        for_quest = for_quest_input.checked;

    var pic1_input = ReactDOM.findDOMNode(this.refs.pic1);
    var pic2_input = ReactDOM.findDOMNode(this.refs.pic2);
    var pic3_input = ReactDOM.findDOMNode(this.refs.pic3);
    var pic4_input = ReactDOM.findDOMNode(this.refs.pic4);
    var pic5_input = ReactDOM.findDOMNode(this.refs.pic5);
    var pic6_input = ReactDOM.findDOMNode(this.refs.pic6);
    var pic7_input = ReactDOM.findDOMNode(this.refs.pic7);
    var pic8_input = ReactDOM.findDOMNode(this.refs.pic8);
    var pic9_input = ReactDOM.findDOMNode(this.refs.pic9);
    var pic10_input = ReactDOM.findDOMNode(this.refs.pic10);
    var pic11_input = ReactDOM.findDOMNode(this.refs.pic11);
    var pic12_input = ReactDOM.findDOMNode(this.refs.pic12);
    var answer_input = ReactDOM.findDOMNode(this.refs.answer);
    var pic1 = pic1_input.value.trim(),
        pic2 = pic2_input.value.trim(),
        pic3 = pic3_input.value.trim(),
        pic4 = pic4_input.value.trim();
    var pic5 = pic5_input.value.trim(),
        pic6 = pic6_input.value.trim(),
        pic7 = pic7_input.value.trim(),
        pic8 = pic8_input.value.trim();
    var pic9 = pic9_input.value.trim(),
        pic10 = pic10_input.value.trim(),
        pic11 = pic11_input.value.trim(),
        pic12 = pic12_input.value.trim();
    var answer = answer_input.value.trim();

    var task_type = this.state.task_type;
    var subtype = this.state.subtype;

    new_task = {
      direction: direction,
      task_type: task_type,
      subtype: subtype,
      age: age,
      text: text,
      pic1: pic1,
      pic2: pic2,
      pic3: pic3,
      pic4: pic4,
      pic5: pic5,
      pic6: pic6,
      pic7: pic7,
      pic8: pic8,
      pic9: pic9,
      pic10: pic10,
      pic11: pic11,
      pic12: pic12,
      answer: answer,
      for_quest: for_quest
    };
    $.ajax({
      url: '/tasks',
      //dataType: 'json',
      type: 'POST',
      data: {
        task: new_task
      },
      success: (function (data) {}).bind(this),
      error: (function (xhr, status, err) {
        console.error("ОШИБКА", status, err.toString());
      }).bind(this)
    });
  },
  render: function () {
    var pic10_11_12, notice;
    if (this.state.task_type == 6) {
      notice = React.createElement(
        'div',
        { className: 'notice-create-task' },
        'Максимум 3 варианта ответа, за эти варианты ответов отвечают ',
        React.createElement(
          'b',
          null,
          'дополнительные картинки'
        ),
        '. (pic10, pic11, pic12)',
        React.createElement('br', null),
        'Последовательности от 1 до 8 выстраиваются в ряд, 9 - в квадратик 3x3'
      );
    }
    if (this.state.task_type != 6) {
      pic10_11_12 = 'displaynone';
    }
    var display_answer;
    if (this.state.task_type == 8) {
      display_answer = 'displaynone';
    }
    content_task_type = React.createElement(
      'div',
      null,
      React.createElement(
        'p',
        null,
        'Нумеровка картинок с единицы (минимальный ответ 1, максимальный - 9)'
      ),
      notice,
      React.createElement(
        'h3',
        null,
        'Картиночки теперь'
      ),
      React.createElement(
        'div',
        null,
        '1. ',
        React.createElement('input', { type: 'text', ref: 'pic1', placeholder: 'pic1' })
      ),
      React.createElement(
        'div',
        null,
        '2. ',
        React.createElement('input', { type: 'text', ref: 'pic2', placeholder: 'pic2' })
      ),
      React.createElement(
        'div',
        null,
        '3. ',
        React.createElement('input', { type: 'text', ref: 'pic3', placeholder: 'pic3' })
      ),
      React.createElement(
        'div',
        null,
        '4. ',
        React.createElement('input', { type: 'text', ref: 'pic4', placeholder: 'pic4' })
      ),
      React.createElement(
        'div',
        null,
        '5. ',
        React.createElement('input', { type: 'text', ref: 'pic5', placeholder: 'pic5' })
      ),
      React.createElement(
        'div',
        null,
        '6. ',
        React.createElement('input', { type: 'text', ref: 'pic6', placeholder: 'pic6' })
      ),
      React.createElement(
        'div',
        null,
        '7. ',
        React.createElement('input', { type: 'text', ref: 'pic7', placeholder: 'pic7' })
      ),
      React.createElement(
        'div',
        null,
        '8. ',
        React.createElement('input', { type: 'text', ref: 'pic8', placeholder: 'pic8' })
      ),
      React.createElement(
        'div',
        null,
        '9. ',
        React.createElement('input', { type: 'text', ref: 'pic9', placeholder: 'pic9' })
      ),
      React.createElement(
        'div',
        { className: pic10_11_12 },
        React.createElement(
          'h4',
          null,
          'Дополнительные картинки'
        ),
        React.createElement(
          'div',
          null,
          '10. (1)',
          React.createElement('input', { type: 'text', ref: 'pic10', placeholder: 'pic10' })
        ),
        React.createElement(
          'div',
          null,
          '11. (2)',
          React.createElement('input', { type: 'text', ref: 'pic11', placeholder: 'pic11' })
        ),
        React.createElement(
          'div',
          null,
          '12. (3)',
          React.createElement('input', { type: 'text', ref: 'pic12', placeholder: 'pic12' })
        )
      ),
      React.createElement('input', { className: display_answer, type: 'text', ref: 'answer', placeholder: 'Ответ (последовательность из цифр в правильном порядке)' }),
      React.createElement(
        'button',
        { onClick: this.createTask1 },
        'Созидаем!'
      )
    );

    return React.createElement(
      'div',
      { className: 'create-task' },
      React.createElement(
        'h2',
        null,
        'Создайте задание'
      ),
      React.createElement('input', { type: 'text', ref: 'direction', placeholder: 'Направление (логика, воображение и т.д.)' }),
      React.createElement('input', { type: 'number', ref: 'age', placeholder: 'Возраст' }),
      React.createElement('input', { type: 'text', ref: 'text', placeholder: 'Текст задания' }),
      React.createElement(
        'select',
        { ref: 'task_type', onChange: this.selectTypeTask },
        React.createElement(
          'option',
          { disabled: true },
          'Выберите тип задания'
        ),
        React.createElement(
          'option',
          { value: '1' },
          '1'
        ),
        React.createElement(
          'option',
          { value: '2' },
          '2'
        ),
        React.createElement(
          'option',
          { value: '3' },
          '3'
        ),
        React.createElement(
          'option',
          { value: '4' },
          '4'
        ),
        React.createElement(
          'option',
          { value: '5' },
          '5'
        ),
        React.createElement(
          'option',
          { value: '6' },
          '6'
        ),
        React.createElement(
          'option',
          { value: '7' },
          '7'
        ),
        React.createElement(
          'option',
          { value: '8' },
          '8'
        ),
        React.createElement(
          'option',
          { value: '9' },
          '9'
        ),
        React.createElement(
          'option',
          { value: '10' },
          '10'
        ),
        React.createElement(
          'option',
          { value: '11' },
          '11'
        )
      ),
      React.createElement(
        'select',
        { ref: 'subtype', onChange: this.selectSubtype },
        React.createElement(
          'option',
          { disabled: true },
          'Подтип'
        ),
        React.createElement(
          'option',
          { value: '1' },
          '1'
        ),
        React.createElement(
          'option',
          { value: '2' },
          '2'
        ),
        React.createElement(
          'option',
          { value: '3' },
          '3'
        ),
        React.createElement(
          'option',
          { value: '4' },
          '4'
        ),
        React.createElement(
          'option',
          { value: '5' },
          '5'
        )
      ),
      React.createElement(
        'div',
        null,
        'Ставить галочку, если хотим, чтобы она не была в квестах ',
        React.createElement('input', { type: 'checkbox', value: '1', ref: 'for_quest', name: 'for_quest' })
      ),
      content_task_type
    );
  }
});