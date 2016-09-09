const Picture6 = React.createClass({
  clickHandler: function(){
      var new_answer = this.props.answer + 1
      if(new_answer > this.props.number_of_additional_pics) new_answer = 1
      this.props.toAnswer(new_answer);
  },
  render: function() {
    var classStyle = this.props.classSizePics + ' col card wrap-pic'
    var the_picture
    if(this.props.task_pic == 'пусто'){
      var task = this.props.task
      var src_empty_pic = '/images/question_sign.gif'
      switch (this.props.answer) {
        case 1:
          src_empty_pic = task.pic10
          break
        case 2:
          src_empty_pic = task.pic11
          break
        case 3:
          src_empty_pic = task.pic12
          break
      }
      the_picture = (
        <img src={src_empty_pic} className='cursor--pointer' onClick={this.clickHandler}/>
      );
    }
    else{
      the_picture = (
        <img src={this.props.task_pic}/>
      );
    }
    return (
      <div className={classStyle}>
        {the_picture}
      </div>
    );
  }
})

//Последовательность   //1-7 картинок в 1 ряд, 8 картинок в 2 ряда, 9 - в 3 ряда
const Task6 = React.createClass({
  getInitialState: function () {
    return {
      answer: 0,
      number_of_pics: 9,
      number_of_additional_pics: 3
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

    var number_of_additional_pics = 3;
    if(task.pic12 == "") number_of_additional_pics -= 1;
    if(task.pic11 == "") number_of_additional_pics -= 1;
    if(task.pic10 == "") number_of_additional_pics -= 1;
    this.setState({
      number_of_pics: number_of_pics,
      number_of_additional_pics: number_of_additional_pics
    });
  },
  repeatTask: function() {
    this.props.repeatTask()
    this.setState({
      answer: 0
    });
  },
  toAnswer: function(item){
    var mySound = new buzz.sound("/sounds/branch_break", {
      formats: [ "mp3", "aac", "ogg" ],
      preload: true,
      autoplay: true,
      loop: false
    });
    this.setState({
      answer: item
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
      var the_pic = <Picture6 classSizePics={size_pics} task={this.props.task} task_pic={task_pic_i} toAnswer={this.toAnswer} number_of_additional_pics={this.state.number_of_additional_pics} answer={this.state.answer} item={i} key={i}/>
      pics.push(the_pic)
    }

    //Контент самого задания
    content = (
      <div>
        <div className='content-task-type' id='type_task6'>
          {pics}
          <div className='clear'></div>
        </div>
      </div>
    );

    //Кнопки действий
    var button_to_answer
    if(this.props.status_current_task == 0){
      button_to_answer = <button className="btn-m btn-m-3 btn-m-3a icon-heart-2 get-answer" onClick={this.acceptAnswer}>Ответить</button>
    }
    var button_next_task, button_to_repeat, button_complete_quest
    if(this.props.status_current_task == 1){
      if((this.props.sum_right_answers != this.props.tasks_length && this.props.quest) || !this.props.quest)
        button_next_task = <button className="btn-m btn-m-3 btn-m-3e icon-arrow-right next-task" onClick={this.props.nextTask}>Следующее задание</button>
      if((this.props.sum_right_answers == this.props.tasks_length && this.props.quest) && this.props.quest)
        button_complete_quest = (
          <div>
            <a href='/quests'>
              <button className="btn-m btn-m-3 btn-m-3e icon-arrow-right next-task">Закончить квест</button>
            </a>
          </div>);
      button_to_repeat = ''
    }else if(this.props.status_current_task == -1){
      button_next_task = <button className="btn-m btn-m-3 btn-m-3e icon-arrow-right next-task" onClick={this.props.nextTask}>Следующее задание</button>
      button_to_repeat = <button className="btn-m btn-m-3 btn-m-3a icon-star-2 repeat-task" onClick={this.repeatTask}>Еще разок</button>
    }

    //Результат выполнения задания
    var result_task
    if(!this.props.status_current_task){
      result_task = (
        <div>
          <h2>
            <div className='col'><span className='tag tag--light tag--heading tag--heading--h2'>{task.direction}</span></div>
            <img src='/images/forward.png' className='img-next-task fr cursor--pointer' onClick={this.props.nextTask}/>
          </h2>
          <div className='clear'></div>
          <p className='task-text'>{task.text}</p>
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
          {button_complete_quest}
          {button_to_answer}
          {button_to_repeat}
          {button_next_task}
        </div>
      </div>
    );
  }
})
