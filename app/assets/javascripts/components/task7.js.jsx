const Picture7 = React.createClass({
  clickHandler: function(){   
      this.props.toAnswer(this.props.item);
  },
  render: function() {
    var classStyle = this.props.classSizePics + ' col card'
    return (
      <div className={classStyle} onClick={this.clickHandler}>
        <img src={this.props.task_pic} />
      </div>
    );
  }
})

//Ввод ответа с клавиатуры
const Task7 = React.createClass({
  getInitialState: function () {
    return {
      answer_btn_display: false,
      answer: 0,
      number_of_pics: 9
    };
  },
  componentDidMount: function(){ 
    var task = this.props.task
    var number_of_pics = 9;
    if(task.pic9 == "") number_of_pics -= 1;
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
  repeatTask: function() {
    this.props.repeatTask()
    this.setState({
      answer_btn_display: false,
      answer: 0
    });
  },
  toAnswer: function(item){
    var mySound = new buzz.sound("/sounds/button_click_on", {
        formats: [ "mp3", "aac", "ogg" ],
        preload: true,
        autoplay: true,
        loop: false
    });
    var text_input = ReactDOM.findDOMNode(this.refs.answer)
    var val_input = text_input.value.trim().toLowerCase()
    this.setState({
      answer_btn_display: true,
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
    var size_pics = "tasks-pics-general tasks-pics-"+number_of_pics
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
      else if(i == 9) var task_pic_i = task.pic9
      var the_pic = <Picture7 classSizePics={size_pics} task_pic={task_pic_i} toAnswer={this.toAnswer} answer={this.state.answer} item={i} key={i}/>
      pics.push(the_pic)
    }

    var pic_on_task_text
    if(task.pic10 != '' && task.subtype == 1){
      pic_on_task_text = (
        <div className='img-in-task-text mbm card'>
          <img src={task.pic10} />
        </div>
      );
    }

    var answer_input = (
      <input type='text' className='' placeholder='Пиши здесь' ref='answer' onChange={this.toAnswer} />
    );

    //Контент самого задания
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

    //Кнопки действий
    var button_to_answer
    if(this.props.status_current_task == 0 && this.state.answer_btn_display){
      button_to_answer = <button className="btn-m btn-m-3 btn-m-3a icon-heart-2 get-answer animated bounceIn" onClick={this.acceptAnswer}>Ответить</button>
    }
    var button_next_task, button_to_repeat='', button_complete_quest
    if(this.props.status_current_task == 1){ 
        button_next_task = <button className="btn-m btn-m-3 btn-m-3e icon-arrow-right next-task" onClick={this.props.nextTask}>Следующее задание</button>
    }else if(this.props.status_current_task == -1){
        button_next_task = <button className="btn-m btn-m-3 btn-m-3e icon-arrow-right next-task" onClick={this.props.nextTask}>Следующее задание</button>
        if(!this.props.checkpoint)
          button_to_repeat = <button className="btn-m btn-m-3 btn-m-3a icon-star-2 repeat-task" onClick={this.repeatTask}>Еще разок</button>
    }

    //Результат выполнения задания
    var result_task, img_arrow_next_task
    if(!this.props.status_current_task){
      if(!this.props.test){
        img_arrow_next_task = <img src='/images/forward.png' className='img-next-task fr cursor--pointer' onClick={this.props.nextTask}/>
      }else{
        img_arrow_next_task = ''
      }
      result_task = (
        <div>
          <h2>
            <div className='col'><span className='tag tag--light tag--heading tag--heading--h2'>{task.direction}</span></div>
            {img_arrow_next_task}
          </h2>
          <div className='clear'></div>
          <p className='task-text'>{task.text}</p>
          {pic_on_task_text}
        </div>
      );
    }else{
      result_task = this.props.task_result(this.props.status_current_task)
    }

    return (
      <div>
        <div className='col col-main task-participate animated fadeIn'>
          {content}
        </div>
        <div className='col wrap-task-text ml-2proc'>
          {result_task}
          {button_to_answer}
          {button_to_repeat}
          {button_next_task}
          {button_complete_quest}
        </div>
      </div>
    );
  }
})
