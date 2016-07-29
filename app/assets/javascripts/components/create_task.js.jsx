const CreateTask = React.createClass({
  //BEGIN***************************************************DECLARE
  getInitialState: function () {
    return {
      task_type: 1
    };
  },
  selectTypeTask: function(){
    var task_type = ReactDOM.findDOMNode(this.refs.task_type)
    this.setState({
      task_type: task_type.value
    });
  },
  createTask1: function(){
    var direction_input = ReactDOM.findDOMNode(this.refs.direction)
    var age_input = ReactDOM.findDOMNode(this.refs.age)
    var text_input = ReactDOM.findDOMNode(this.refs.text)
    var direction = direction_input.value.trim(), age = age_input.value.trim(), text = text_input.value.trim()

    var pic1_input = ReactDOM.findDOMNode(this.refs.pic1)
    var pic2_input = ReactDOM.findDOMNode(this.refs.pic2)
    var pic3_input = ReactDOM.findDOMNode(this.refs.pic3)
    var pic4_input = ReactDOM.findDOMNode(this.refs.pic4)
    var pic5_input = ReactDOM.findDOMNode(this.refs.pic5)
    var pic6_input = ReactDOM.findDOMNode(this.refs.pic6)
    var pic7_input = ReactDOM.findDOMNode(this.refs.pic7)
    var pic8_input = ReactDOM.findDOMNode(this.refs.pic8)
    var answer_input = ReactDOM.findDOMNode(this.refs.answer)
    var pic1 = pic1_input.value.trim(), pic2 = pic2_input.value.trim(), pic3 = pic3_input.value.trim(), pic4 = pic4_input.value.trim()
    var pic5 = pic5_input.value.trim(), pic6 = pic6_input.value.trim(), pic7 = pic7_input.value.trim(), pic8 = pic8_input.value.trim()
    var answer = answer_input.value.trim()

    var task_type = this.state.task_type

    new_task = {
      direction: direction,
      task_type: task_type,
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
      answer: answer
    };
    $.ajax({
      url: '/tasks',
      //dataType: 'json',
      type: 'POST',
      data: {
        task: new_task
      },
      success: function(data) {
        
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("ОШИБКА", status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
      if(this.state.task_type == 1 || this.state.task_type == 2)
        content_task_type = (
          <div>
            <h3>Первый тип задания.</h3>
            <p>Нужно расставить картинки в правильном порядке</p>
            <div>1. <input type='text' ref='pic1' placeholder='pic1' /></div>
            <div>2. <input type='text' ref='pic2' placeholder='pic2' /></div>
            <div>3. <input type='text' ref='pic3' placeholder='pic3' /></div>
            <div>4. <input type='text' ref='pic4' placeholder='pic4' /></div>
            <div>5. <input type='text' ref='pic5' placeholder='pic5' /></div>
            <div>6. <input type='text' ref='pic6' placeholder='pic6' /></div>
            <div>7. <input type='text' ref='pic7' placeholder='pic7' /></div>
            <div>8. <input type='text' ref='pic8' placeholder='pic8' /></div>
            <input type='text' ref='answer' placeholder='Ответ (последовательность из цифр в правильном порядке)' />
            <button onClick={this.createTask1}>Созидаем!</button>
          </div>

        );

    

    return (
      <div className='create-task'>
        <h2>Создайте задание</h2>
        <input type='text' ref='direction' placeholder='Направление (логика, воображение и т.д.)'/>
        <input type="number" ref='age' placeholder='Возраст'/>
        <input type='text' ref='text' placeholder='Текст задания'/>
        <select ref='task_type' onChange={this.selectTypeTask}>
          <option disabled>Выберите тип задания</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
        </select>
        {content_task_type}
      </div>
    );
  }
});

