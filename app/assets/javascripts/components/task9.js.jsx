const Picture9 = React.createClass({
  clickHandler: function(){   
      this.props.toAnswer(this.props.item);
  },
  render: function() {
    var answer = this.props.answer
    var item = this.props.item
    var covered = this.props.covered
    var classStyle = this.props.classSizePics + ' col flip-container'
    if(answer[item] == '1' || !covered)
      classStyle += ' flip'
    return (
      <div className={classStyle} onClick={this.clickHandler}>
        <div className="flipper">
          <div className='front card'>
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

//Выбор правильного ответа, кликнув на картинку, ответ только один.
const Task9 = React.createClass({
  getInitialState: function () {
    return {
      answer: '000000000',
      number_of_pics: 9,
      elapsed: 0,
      covered: false
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
    $('.flip-container').height($('.flip-container').width()*0.75 + 3);
    $('.front, .back').height($('.flip-container').width()*0.75 - 3);

    this.timer = setInterval(this.tick, 50);
    this.setState({
      number_of_pics: number_of_pics
    });
  },
  componentWillUnmount: function() {
    clearInterval(this.timer)
  },
  tick: function(){
    if(this.state.elapsed < 0){
      if(!this.state.covered){

        this.setState({
          covered: true
        });
      }
    }else{
      this.setState({
        elapsed: 11000 - new Date() + this.props.start
      });
    }
  },
  toAnswer: function(item){
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
      answer: new_answer
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
      else if(i == 9) var task_pic_i = task.pic9
      var the_pic = <Picture9 classSizePics={size_pics} task_pic={task_pic_i} toAnswer={this.toAnswer} answer={this.state.answer} covered={this.state.covered} item={i-1} key={i}/>
      pics.push(the_pic)
    }

    var button_to_answer
    if(this.props.status_current_task == 0){
      button_to_answer = <button className="btn-m btn-m-3 btn-m-3a icon-heart-2 get-answer" onClick={this.acceptAnswer}>Ответить</button>
    }

    var elapsed = Math.round(this.state.elapsed/1000)
    var seconds = elapsed

    content = (
      <div>
        <div className='content-task-type' id='type_task9'>
          {pics}
          <div className='clear'></div>
          {seconds}
        </div>
      </div>
    );
    return (
      <div className='task-participate  animated fadeIn'>
        <h2 className='h--thin mbm'><span className='prxs'>Запоминание картинок, а после этого картинки скрываются</span> <span className='tag tag--light tag--heading tag--heading--h2'>6 лет</span></h2>
        {content}
        {button_to_answer}
      </div>
    );
  }
})
