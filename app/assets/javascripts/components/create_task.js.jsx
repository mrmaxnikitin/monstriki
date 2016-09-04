const CreateTask = React.createClass({
  //BEGIN***************************************************DECLARE
  getInitialState: function () {
    return {
      task_type: 1,
      subtype: 1
    };
  },
  selectTypeTask: function(){
    var task_type = ReactDOM.findDOMNode(this.refs.task_type)
    this.setState({
      task_type: task_type.value
    });
  },
  selectSubtype: function(){
    var subtype = ReactDOM.findDOMNode(this.refs.subtype)
    this.setState({
      subtype: subtype.value
    });
  },
  createTask1: function(){
    var direction_input = ReactDOM.findDOMNode(this.refs.direction)
    var age_input = ReactDOM.findDOMNode(this.refs.age)
    var text_input = ReactDOM.findDOMNode(this.refs.text)
    var in_quest_input = ReactDOM.findDOMNode(this.refs.in_quest)
    var only_quest_input = ReactDOM.findDOMNode(this.refs.only_quest)
    var sample_input = ReactDOM.findDOMNode(this.refs.sample)
    var direction = direction_input.value.trim(), age = age_input.value.trim(), text = text_input.value.trim()
    var in_quest = in_quest_input.checked, only_quest = only_quest_input.checked, sample = sample_input.checked

    var pic1_input = ReactDOM.findDOMNode(this.refs.pic1)
    var pic2_input = ReactDOM.findDOMNode(this.refs.pic2)
    var pic3_input = ReactDOM.findDOMNode(this.refs.pic3)
    var pic4_input = ReactDOM.findDOMNode(this.refs.pic4)
    var pic5_input = ReactDOM.findDOMNode(this.refs.pic5)
    var pic6_input = ReactDOM.findDOMNode(this.refs.pic6)
    var pic7_input = ReactDOM.findDOMNode(this.refs.pic7)
    var pic8_input = ReactDOM.findDOMNode(this.refs.pic8)
    var pic9_input = ReactDOM.findDOMNode(this.refs.pic9)
    var pic10_input = ReactDOM.findDOMNode(this.refs.pic10)
    var pic11_input = ReactDOM.findDOMNode(this.refs.pic11)
    var pic12_input = ReactDOM.findDOMNode(this.refs.pic12)
    var answer_input = ReactDOM.findDOMNode(this.refs.answer)
    var pic1 = pic1_input.value.trim(), pic2 = pic2_input.value.trim(), pic3 = pic3_input.value.trim(), pic4 = pic4_input.value.trim()
    var pic5 = pic5_input.value.trim(), pic6 = pic6_input.value.trim(), pic7 = pic7_input.value.trim(), pic8 = pic8_input.value.trim()
    var pic9 = pic9_input.value.trim(), pic10 = pic10_input.value.trim(), pic11 = pic11_input.value.trim(), pic12 = pic12_input.value.trim()
    var answer = answer_input.value.trim()

    var task_type = this.state.task_type
    var subtype = this.state.subtype

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
      in_quest: in_quest
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
    var pic10_11_12, notice
    if(this.state.task_type == 6){
      notice = (
        <div className='notice-create-task'>
          Максимум 3 варианта ответа, за эти варианты ответов отвечают <b>дополнительные картинки</b>. (pic10, pic11, pic12)<br/>
          Последовательности от 1 до 8 выстраиваются в ряд, 9 - в квадратик 3x3
        </div>
      );
    }
    if(this.state.task_type != 6){
      pic10_11_12 = 'displaynone'
    }
    var display_answer
    if(this.state.task_type == 8){
      display_answer = 'displaynone'
    }
    content_task_type = (
      <div>
        <p>Нумеровка картинок с единицы (минимальный ответ 1, максимальный - 9)</p>
        {notice}
        <h3>Картиночки теперь</h3>
        <div>1. <input type='text' ref='pic1' placeholder='pic1' /></div>
        <div>2. <input type='text' ref='pic2' placeholder='pic2' /></div>
        <div>3. <input type='text' ref='pic3' placeholder='pic3' /></div>
        <div>4. <input type='text' ref='pic4' placeholder='pic4' /></div>
        <div>5. <input type='text' ref='pic5' placeholder='pic5' /></div>
        <div>6. <input type='text' ref='pic6' placeholder='pic6' /></div>
        <div>7. <input type='text' ref='pic7' placeholder='pic7' /></div>
        <div>8. <input type='text' ref='pic8' placeholder='pic8' /></div>
        <div>9. <input type='text' ref='pic9' placeholder='pic9' /></div>
        <div className={pic10_11_12}>
          <h4>Дополнительные картинки</h4>
          <div>10. (1)<input type='text' ref='pic10' placeholder='pic10' /></div>
          <div>11. (2)<input type='text' ref='pic11' placeholder='pic11' /></div>
          <div>12. (3)<input type='text' ref='pic12' placeholder='pic12' /></div>
        </div>
        <input className={display_answer} type='text' ref='answer' placeholder='Ответ (последовательность из цифр в правильном порядке)' />
        <button onClick={this.createTask1}>Созидаем!</button>
      </div>

    );

    

    return (
      <div className='create-task'>
        <h2>Создайте задание</h2>
        <input type='text' ref='direction' placeholder='Направление (логика, память, внимание, математика, мир вокруг нас)'/>
        <input type="number" ref='age' placeholder='Возраст'/>
        <input type='text' ref='text' placeholder='Текст задания'/>
        <select ref='task_type' onChange={this.selectTypeTask}>
          <option disabled>Выберите тип задания</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
          <option value='10'>10</option>
          <option value='11'>11</option>
        </select>
        <select ref='subtype' onChange={this.selectSubtype}>
          <option disabled>Подтип</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>
        <div>Ставить галочку, если хотим, чтобы она не была в квестах <input type='checkbox' value='1' ref='in_quest' name='in_quest'/></div>
        <div>Ставить галочку, если задание только для квестов <input type='checkbox' value='1' ref='only_quest' name='only_quest'/></div>
        <div>Ставить галочку, если задание для примера <input type='checkbox' value='1' ref='sample' name='sample'/></div>
        {content_task_type}
      </div>
    );
  }
});

