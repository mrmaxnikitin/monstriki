const Picture4 = React.createClass({
  clickHandler: function(){   
      this.props.toAnswer(this.props.item);
  },
  render: function() {
    var answer = this.props.answer
    var item = this.props.item
    var classStyle = this.props.classSizePics + ' col card'
    if(answer == item){
      classStyle += ' choosed_pic'
    }
    return (
      <div className={classStyle} onClick={this.clickHandler}>
        <img src={this.props.task_pic}/>
      </div>
    );
  }
})

//Одна статичная картинка, а другие, как варианты ответов
const Task4 = React.createClass({
  getInitialState: function () {
    return {
      answer: 0,
      number_of_pics: 8
    };
  },
  componentDidMount: function(){ 
    var task = this.props.task
    var number_of_pics = 8;
    if(task.pic9 == "") number_of_pics -= 1;
    if(task.pic8 == "") number_of_pics -= 1;
    if(task.pic7 == "") number_of_pics -= 1;
    if(task.pic6 == "") number_of_pics -= 1;
    if(task.pic5 == "") number_of_pics -= 1;
    if(task.pic4 == "") number_of_pics -= 1;
    if(task.pic3 == "") number_of_pics -= 1;
    if(task.pic2 == "") number_of_pics -= 1;
    
    this.setState({
      number_of_pics: number_of_pics
    });
  },
  repeatTask: function() {
    this.props.repeatTask()
    this.setState({
      answer: 0
    });
  },
  toAnswer: function(item){
    var mySound = new buzz.sound("/sounds/button_tiny", {
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
    var size_pics = "tasks-pics-"+number_of_pics
    for(i = 2; i <= number_of_pics+1; i++){
      var task_pic_i
      if(i == 2)      task_pic_i = task.pic2
      else if(i == 3) task_pic_i = task.pic3
      else if(i == 4) task_pic_i = task.pic4
      else if(i == 5) task_pic_i = task.pic5
      else if(i == 6) task_pic_i = task.pic6
      else if(i == 7) task_pic_i = task.pic7
      else if(i == 8) task_pic_i = task.pic8
      var the_pic = <Picture4 classSizePics={size_pics} task_pic={task_pic_i} toAnswer={this.toAnswer} answer={this.state.answer} item={i} key={i}/>
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

    //Контент самого задания
    content = (
      <div>
        <div className='content-task-type' id='type_task4'>
          <div className='wrap-general-picture'>
            <img className='general-picture' src={task.pic1} />
          </div>
          <div className='functional-pictures'>
            {pics}
          </div>
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

    if(this.props.test){
      button_next_task = ''
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
          {button_complete_quest}
          {button_to_answer}
          {button_to_repeat}
          {button_next_task}
        </div>
      </div>
    );
  }
})
