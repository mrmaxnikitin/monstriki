const Picture3 = React.createClass({
  clickHandler: function(){
      var value_color_id = this.props.color_id + 1
      if(value_color_id > 4) value_color_id = 0
      this.props.toAnswer(this.props.item, value_color_id);
  },
  render: function() {
    var class_colored_pic = this.props.classSizePics + " pic-task-type-3"
    switch (this.props.color_id) {
      case 0:
        class_colored_pic += " color-white"
        break
      case 1:
        class_colored_pic += " color-red"
        break
      case 2:
        class_colored_pic += " color-blue"
        break
      case 3:
        class_colored_pic += " color-green"
        break
      case 4:
        class_colored_pic += " color-yellow"
        break
    }
    return (
      <img className={class_colored_pic} src={this.props.task_pic} onClick={this.clickHandler} />
    );
  }
})

//Раскрасьте предмет
const Task3 = React.createClass({
  getInitialState: function () {
    return {
      answer: [0, 0, 0, 0, 0, 0, 0, 0],
      number_of_pics: 8
    };
  },
  componentDidMount: function(){ 
    var task = this.props.task
    var number_of_pics = 8;
    if(task.pic8 == "") number_of_pics -= 1;
    if(task.pic7 == "") number_of_pics -= 1;
    if(task.pic6 == "") number_of_pics -= 1;
    if(task.pic5 == "") number_of_pics -= 1;
    if(task.pic4 == "") number_of_pics -= 1;
    if(task.pic3 == "") number_of_pics -= 1;
    if(task.pic2 == "") number_of_pics -= 1;
    if(task.pic1 == "") number_of_pics -= 1;
    this.setState({
      number_of_pics: number_of_pics
    });
  },
  toAnswer: function(item, color_id){   //color_id: 0 - белый, 1 - красный,  2 - синий, 3 - зеленый, 4 - желтый
    var a = this.state.answer
    a[item] = color_id
    this.setState({
      answer: a
    });
  },
  acceptAnswer: function(){
    var s = new String()
    var number_of_pics = this.state.number_of_pics
    for(i = 0; i < number_of_pics; i++){
      s += this.state.answer[i]
    }
    this.props.acceptAnswer(s)
  },
  render: function() {
    var task = this.props.task
    var content
    var number_of_pics = this.state.number_of_pics
    //Вывод изображение в зависимости от их количества
    var pics = []
    var size_pics = "tasks-pics-"+number_of_pics
    for(i = 1; i <= number_of_pics; i++){
      var task_pic_i
      if(i == 1)      task_pic_i = task.pic1
      else if(i == 2) task_pic_i = task.pic2
      else if(i == 3) task_pic_i = task.pic3
      else if(i == 4) task_pic_i = task.pic4
      else if(i == 5) task_pic_i = task.pic5
      else if(i == 6) task_pic_i = task.pic6
      else if(i == 7) task_pic_i = task.pic7
      else if(i == 8) task_pic_i = task.pic8
      var the_pic = <Picture3 classSizePics={size_pics} task_pic={task_pic_i} toAnswer={this.toAnswer} color_id={this.state.answer[i-1]} item={i-1} key={i}/>
      pics.push(the_pic)
    }

    var button_to_answer
    if(this.props.status_current_task == 0){
      button_to_answer = <button className="btn-m btn-m-3 btn-m-3a icon-heart-2 get-answer" onClick={this.acceptAnswer}>Ответить</button>
    }

    content = (
      <div>
        <div className='content-task-type' id='type_task3'>
          {pics}
        </div>
      </div>
    );
    return (
      <div className='task-participate animated fadeIn'>
        <h2 className='h--thin mbm'><span className='prxs'>Раскрасьте предмет</span> <span className='tag tag--light tag--heading tag--heading--h2'>5 лет</span></h2>
        {content}
        {button_to_answer}
      </div>
    );
  }
})
