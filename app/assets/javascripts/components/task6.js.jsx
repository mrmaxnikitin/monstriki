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

//Последовательность
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
  toAnswer: function(item){
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

    var button_to_answer
    if(this.props.status_current_task == 0){
      button_to_answer = <button className="btn-m btn-m-3 btn-m-3a icon-heart-2 get-answer" onClick={this.acceptAnswer}>Ответить</button>
    }

    content = (
      <div>
        <div className='content-task-type' id='type_task6'>
          {pics}
        </div>
      </div>
    );
    return (
      <div className='task-participate  animated fadeIn'>
        <h2 className='h--thin mbm'><span className='prxs'>Последовательность</span> <span className='tag tag--light tag--heading tag--heading--h2'>6 лет</span></h2>
        {content}
        {button_to_answer}
      </div>
    );
  }
})
