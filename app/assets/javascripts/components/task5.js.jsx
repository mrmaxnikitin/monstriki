const Picture5 = React.createClass({
  clickHandler: function(){   
      this.props.toAnswer(this.props.item);
  },
  render: function() {
    var answer = this.props.answer
    var item = this.props.item
    var classStyle = this.props.classSizePics + ' col card'
    if(answer[item] == '1'){
      classStyle += ' choosed_pic'
    }
    return (
      <div className={classStyle} onClick={this.clickHandler}>
        <img src={this.props.task_pic} />
      </div>
    );
  }
})

const Picture5Subtype2 = React.createClass({
  render: function() {
    var classStyle = this.props.classSizePics + ' col card'
    return (
      <div className={classStyle}>
        <img src={this.props.task_pic} />
      </div>
    );
  }
})

const Video1Subtype3 = React.createClass({
  render: function() {
    var classStyle = this.props.classSizePics + ' col card tac Video1Subtype3'
    return (
      <div className={classStyle}>
        <iframe width='100%' height='380'
          src={"http://www.youtube.com/embed/" + this.props.task_pic}>
        </iframe>
      </div>
    );
  }
})

//Выбор нескольких ответов
const Task5 = React.createClass({
  getInitialState: function () {
    return {
      answer_btn_display: false,
      answer: '000000000',
      started: 0,
      number_of_pics: 9
    };
  },
  componentDidMount: function(){ 
    var task = this.props.task
    var number_of_pics = 9;
    //if(task.pic12 == "") number_of_pics -= 1;
    //if(task.pic11 == "") number_of_pics -= 1;
    //if(task.pic10 == "") number_of_pics -= 1;
    if(task.pic9 == "")  number_of_pics -= 1;
    if(task.pic8 == "")  number_of_pics -= 1;
    if(task.pic7 == "")  number_of_pics -= 1;
    if(task.pic6 == "")  number_of_pics -= 1;
    if(task.pic5 == "")  number_of_pics -= 1;
    if(task.pic4 == "")  number_of_pics -= 1;
    if(task.pic3 == "")  number_of_pics -= 1;
    if(task.pic2 == "")  number_of_pics -= 1;
    if(task.pic1 == "")  number_of_pics -= 1;
    this.setState({
      number_of_pics: number_of_pics
    });
  },
  repeatTask: function() {
    this.props.repeatTask()
    this.setState({
      answer_btn_display: false,
      answer: '000000000',
      started: 0
    });
  },
  toAnswer: function(item){
    var mySound = new buzz.sound("/sounds/button_tiny", {
        formats: [ "mp3", "aac", "ogg" ],
        preload: true,
        autoplay: true,
        loop: false
    });
    var number_of_pics = this.state.number_of_pics
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
    this.setState({
      answer_btn_display: true,
      answer: new_answer
    });
  },
  //ответ выглядит в виде строки, где каждое число отображает индекс правильного ответа
  acceptAnswer: function(){
    var number_of_pics = this.state.number_of_pics
    var a = this.state.answer
    var answer = ''
    for(i = 0; i < number_of_pics; i++){
      if(a[i] == '1')
        answer  += i+1
    }
    this.props.acceptAnswer(answer)
  },
  // для task.subtype = 2
  startTask: function(){
    var mySound = new buzz.sound("/sounds/pop_cork", {
        formats: [ "mp3", "aac", "ogg" ],
        preload: true,
        autoplay: true,
        loop: false
    });
    this.setState({
      started: 1
    });
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
      var the_pic = <Picture5 classSizePics={size_pics} task_pic={task_pic_i} toAnswer={this.toAnswer} answer={this.state.answer} item={i-1} key={i}/>
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

    var task_text = task.text
    //Контент самого задания
    if((task.subtype == 2 || task.subtype == 3) && !this.state.started){
      var remember_size_pic = "tasks-pics-general tasks-pics-1"
      var remember_pic
      if(task.subtype == 2) remember_pic = <Picture1Subtype2 classSizePics={remember_size_pic} task_pic={task.pic11} key={11}/>
      else if(task.subtype == 3) remember_pic = <Video1Subtype3 classSizePics={remember_size_pic} task_pic={task.pic11} key={11}/>
      content = (
        <div className='animated fadeIn'>
          <div className='content-task-type' id='type_task5'>
            {remember_pic}
            <div className='clear'></div>
          </div>
        </div>
      );
    }else{
      var styleForSubtype
      if(task.subtype == 2 || task.subtype == 3) styleForSubtype = "animated bounceIn"
      content = (
        <div className={styleForSubtype}>
          <div className='content-task-type' id='type_task5'>
            {pics}
            <div className='clear'></div>
          </div>
        </div>
      );
      if((task.subtype == 2 || task.subtype == 3) && task.pic10 != ''){
        task_text = task.pic10
      }
    }
    

    //Кнопки действий
    var button_to_answer
    if(this.props.status_current_task == 0){
      if((task.subtype == 2 || task.subtype == 3) && !this.state.started)
        button_to_answer = <button className="btn-m btn-m-3 btn-m-3a icon-heart-2 get-start" onClick={this.startTask}>Начать</button>
      else
        if(this.state.answer_btn_display)
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
    var style_task_text = {
      color: this.props.task_text_color,
    };
    var result_task
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
          <p className='task-text' style={style_task_text}>{task_text}</p>
          {pic_on_task_text}
        </div>
      );
    }else{
      result_task = this.props.task_result(this.props.status_current_task)
    }

    var precompile_image
    if(task.subtype == 2 || task.subtype == 3){
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
    }

    return (
      <div className="ADID" id={task.id}>
        <div className='col col-press-68 task-participate animated fadeIn'>
          {content}
        </div>
        <div className='col wrap-task-text ml-2proc'>
          {result_task}
          {button_to_answer}
          {button_to_repeat}
          {button_next_task}
          {button_complete_quest}
        </div>
        {precompile_image}
      </div>
    );
  }
})
