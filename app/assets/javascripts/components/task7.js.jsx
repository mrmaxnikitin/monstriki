const Picture7 = React.createClass({
  clickHandler: function(){   
      this.props.toAnswer(this.props.item);
  },
  render: function() {
    var classStyle = this.props.classSizePics
    return (
      <img className={classStyle} src={this.props.task_pic} onClick={this.clickHandler}/>
    );
  }
})

//Ввод ответа с клавиатуры
const Task7 = React.createClass({
  getInitialState: function () {
    return {
      answer: 0,
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
  toAnswer: function(item){
    var text_input = ReactDOM.findDOMNode(this.refs.answer)
    var val_input = text_input.value.trim().toLowerCase()
    this.setState({
      answer: val_input
    });
  },
  acceptAnswer: function(){
    var answer = this.state.answer
    this.props.acceptAnswer(answer)
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
      if(i == 1)      var task_pic_i = task.pic1
      else if(i == 2) var task_pic_i = task.pic2
      else if(i == 3) var task_pic_i = task.pic3
      else if(i == 4) var task_pic_i = task.pic4
      else if(i == 5) var task_pic_i = task.pic5
      else if(i == 6) var task_pic_i = task.pic6
      else if(i == 7) var task_pic_i = task.pic7
      else if(i == 8) var task_pic_i = task.pic8
      var the_pic = <Picture7 classSizePics={size_pics} task_pic={task_pic_i} toAnswer={this.toAnswer} answer={this.state.answer} item={i} key={i}/>
      pics.push(the_pic)
    }

    var button_to_answer
    if(this.props.status_current_task == 0){
      button_to_answer = <button className="btn-m btn-m-3 btn-m-3a icon-heart-2 get-answer" onClick={this.acceptAnswer}>Ответить</button>
    }

    var answer_input = (
      <input type='text' className='' placeholder='Пиши здесь' ref='answer' onChange={this.toAnswer} />
    );


    content = (
      <div>
        <div className='content-task-type' id='type_task7'>
          <div className='wrap-all-pics'>
            {pics}
          </div>
          <div className='wrap-answer-input'>
            {answer_input}
          </div>
        </div>
      </div>
    );
    return (
      <div className='task-participate  animated fadeIn'>
        <h2 className='h--thin mbm'><span className='prxs'>Выбор правильного ответа</span> <span className='tag tag--light tag--heading tag--heading--h2'>6 лет</span></h2>
        {content}
        {button_to_answer}
      </div>
    );
  }
})
