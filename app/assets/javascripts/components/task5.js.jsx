const Picture5 = React.createClass({
  clickHandler: function(){   
      this.props.toAnswer(this.props.item);
  },
  render: function() {
    var answer = this.props.answer
    var item = this.props.item
    var class_choosed_pic = this.props.classSizePics
    if(answer[item] == '1'){
      class_choosed_pic += ' choosed_pic'
    }
    return (
      <img className={class_choosed_pic} src={this.props.task_pic} onClick={this.clickHandler}/>
    );
  }
})

//Выбор нескольких ответов
const Task5 = React.createClass({
  getInitialState: function () {
    return {
      answer: '000000000',
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
    var number_of_pics = this.state.number_of_pics
    var a = this.state.answer
    var answer = ''
    for(i = 0; i < number_of_pics; i++){
      if(a[i] == '1')
        answer  += i+1
    }
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
      var the_pic = <Picture5 classSizePics={size_pics} task_pic={task_pic_i} toAnswer={this.toAnswer} answer={this.state.answer} item={i-1} key={i}/>
      pics.push(the_pic)
    }

    var button_to_answer
    if(this.props.status_current_task == 0){
      button_to_answer = <button className="btn-m btn-m-3 btn-m-3a icon-heart-2 get-answer" onClick={this.acceptAnswer}>Ответить</button>
    }

    content = (
      <div>
        <div className='content-task-type' id='type_task5'>
          {pics}
        </div>
      </div>
    );
    return (
      <div className='task-participate  animated fadeIn'>
        <h2 className='h--thin mbm'><span className='prxs'>Выбор множество вариантов</span> <span className='tag tag--light tag--heading tag--heading--h2'>6 лет</span></h2>
        {content}
        {button_to_answer}
      </div>
    );
  }
})
