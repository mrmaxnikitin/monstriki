const Picture9 = React.createClass({
  clickHandler: function(){
      if(this.props.clickable_pic){
        this.props.toAnswer(this.props.item)
      }
  },
  render: function() {
    var answer = this.props.answer
    var item = this.props.item
    var covered = this.props.covered
    var classStyle = this.props.classSizePics + ' col flip-container'
    var classStyleFront = 'front card'
    if(answer[item] == '1' || !covered){
      classStyle += ' flip'
      classStyleFront += ' displaynone'
    }
    return (
      <div className={classStyle} onClick={this.clickHandler}>
        <div className="flipper">
          <div className={classStyleFront}>
            <img src='/images/question_sign.gif' />
          </div>
          <div className='back card'>
            <img src={this.props.task_pic} />
          </div>
          <div className='clear'></div>
        </div>
      </div>
    );
  }
})

//Выбор варианта ответа на время
const Task9 = React.createClass({
  getInitialState: function () {
    return {
      answer: '000000000',
      number_of_pics: 9,
      elapsed: 10000,           //отвечает за таймер
      covered: true,        //переворот картинок
      started: false,       //отвечает за кнопку начать и за начало отчета таймера
      start_time: 0,        //для корректной работы таймера (разность времени)
      clickable_pic: false  //кликабельность картинок, чтобы после неправильного выполнения задания нельзя было изменить ничего
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
  componentWillUnmount: function() {
    clearInterval(this.timer)
  },
  repeatTask: function() {
    this.props.repeatTask()
    clearInterval(this.timer)
    this.setState({
      answer: '000000000',
      elapsed: 0,
      covered: true,
      started: false,
      start_time: 0,
      clickable_pic: false
    });
  },
  tick: function(){
    if(this.state.elapsed < 0){
      if(!this.state.covered){

        this.setState({
          answer: '000000000',
          covered: true,
          clickable_pic: true
        });
      }
    }else{
      this.setState({
        elapsed: 10000 - new Date() + this.state.start_time
      });
    }
  },
  startTask: function(){
    var mySound = new buzz.sound("/sounds/clock-ticking-2", {
      formats: [ "mp3", "wav" ],
      preload: true,
      autoplay: true,
      loop: false
    });
    this.timer = setInterval(this.tick, 50);
    this.setState({
      covered: false,
      started: true,
      start_time: Date.now()
    });
  },
  toAnswer: function(item){
    var number_of_pics = this.state.number_of_pics
    var task = this.props.task
    var a = this.state.answer
    var new_answer = ''
    for(i = 0; i < number_of_pics; i++){
      if(item == i){
        if(a[item] == '0')
          new_answer += '1'
        else
          new_answer += '0'
      }else{
        new_answer += a[i]
      }
    }

    //проверка на совпадения правильного ответа. Сравниваю номер кликнутой картинки с номерами указанными при создании вопроса
    var proper = false
    for(i = 0; i < task.answer.length; i++){
      if(task.answer[i] == item + 1){
        proper = true
        break
      }
    }

    if(proper){
      var num_of_1 = 0
      for(i = 0; i < new_answer.length; i++){
        if(new_answer[i] == 1) num_of_1++
      }
      if(num_of_1 == task.answer.length){
        this.acceptAnswer(task.answer)
        this.setState({
          answer: new_answer,
          clickable_pic: false
        });
      }else{
        this.setState({
          answer: new_answer
        });
      }
    }else{
      this.setState({
        answer: new_answer,
        clickable_pic: false
      });
      this.acceptAnswer(0)
    }


  },
  acceptAnswer: function(answer){
    this.props.acceptAnswer(answer)
  },
  onDrop: function(data) {
      console.log(data)
  },
  render: function() {
    //Специфика Типа Задания
    var elapsed = Math.round(this.state.elapsed/1000)
    var seconds = elapsed

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
      var the_pic = <Picture9 classSizePics={size_pics} task_pic={task_pic_i} toAnswer={this.toAnswer} answer={this.state.answer} covered={this.state.covered} clickable_pic={this.state.clickable_pic} item={i-1} key={i}/>
      pics.push(the_pic)
    }

    var pic_on_task_text
    if(task.pic11 != '' && this.state.started && this.state.covered){
      pic_on_task_text = (
        <div className='img-in-task-text mbm card'>
          <img src={task.pic11} />
        </div>
      );
    }

    //Контент самого задания
    content = (
      <div>
        <div className='content-task-type'>
          {pics}
          <div className='clear'></div>
        </div>
      </div>
    );

    //Кнопки действий
    var button_to_start, button_to_answer, button_next_task, button_to_repeat='', button_complete_quest
    if(this.state.started){
      if(this.props.status_current_task == 0){
        button_to_answer = <button className="btn-m btn-m-3 btn-m-3a icon-heart-2 get-answer" onClick={this.acceptAnswer}>Ответить</button>
      }
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
      }else if(this.props.status_current_task == -1){
        button_next_task = <button className="btn-m btn-m-3 btn-m-3e icon-arrow-right next-task" onClick={this.props.nextTask}>Следующее задание</button>
        if(!this.props.checkpoint)
          button_to_repeat = <button className="btn-m btn-m-3 btn-m-3a icon-star-2 repeat-task" onClick={this.repeatTask}>Еще разок</button>
      }
    }else{
      button_to_start = <button className="btn-m btn-m-3 btn-m-3a icon-heart-2 get-start" onClick={this.startTask}>Начать</button>
    }

    //Результат выполнения задания
    var style_task_text = {
      color: this.props.task_text_color,
    };
    var result_task
    if(!this.props.status_current_task){
      var task_text
      if(this.state.started && this.state.covered){
        task_text = task.pic10
      }else{
        task_text = task.text
      }
      result_task = (
        <div>
          <h2>
            <div className='col'><span className='tag tag--light tag--heading tag--heading--h2'>{task.direction}</span></div>
            <div className='timer col'>{seconds}</div>
            <img src='/images/forward.png' className='img-next-task fr cursor--pointer' onClick={this.props.nextTask}/>
          </h2>
          <div className='clear'></div>
          <p className='task-text' style={style_task_text}>{task_text}</p>
          {pic_on_task_text}
        </div>
      );
    }else{
      result_task = this.props.task_result(this.props.status_current_task)
    }


    var precompile_image
    precompile_image = (
      <div className='displaynone'>
        <img src={task.pic1}/>
        <img src={task.pic2}/>
        <img src={task.pic3}/>
        <img src={task.pic4}/>
        <img src={task.pic5}/>
        <img src={task.pic6}/>
        <img src={task.pic7}/>
        <img src={task.pic8}/>
        <img src={task.pic9}/>
      </div>
    );

    return (
      <div  id='type_task9'>
        <div className='col col-press-68 task-participate animated fadeIn'>
          {content}
        </div>
        <div className='col wrap-task-text ml-2proc'>
          {result_task}
          {button_complete_quest}
          {button_to_start}
          {button_to_repeat}
          {button_next_task}
        </div>
        {precompile_image}
      </div>
    );
  }
})


