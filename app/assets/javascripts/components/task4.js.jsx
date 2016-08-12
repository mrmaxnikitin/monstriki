const Picture4 = React.createClass({
  clickHandler: function(){   
      this.props.toAnswer(this.props.item);
  },
  render: function() {
    var style = {
      left: this.props.pic_positions[this.props.item - 1][0]+'px',
      top:  this.props.pic_positions[this.props.item - 1][1]+'px' 
    };
    var answer = this.props.answer
    var item = this.props.item
    var class_choosed_pic = this.props.classSizePics
    if(answer == item){
      class_choosed_pic += ' choosed_pic'
    }
    return (
      <img style={style} className={class_choosed_pic} src={this.props.task_pic} onClick={this.clickHandler}/>
    );
  }
})

//Одна статичная картинка, а другие, как варианты ответов
const Task4 = React.createClass({
  getInitialState: function () {
    return {
      answer: 0,
      number_of_pics: 8,
      pic_positions: [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]],
      position_variant: 0
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

    var position_variant = Math.round(Math.random())
    var delta = Math.PI / (number_of_pics - 2);
    var x = 0, y = 0, angle = 0;
    var a = [[0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0], [0,0]];
    for (i = 1; i < this.state.number_of_pics; i++){
        a[i][0] =  0;   //left
        if(!position_variant)
          a[i][1] =  100 * (Math.sin(angle) - 1)*(1 + (number_of_pics%2));
        else   //top
          a[i][1] =  100 * (1 - Math.sin(angle))*(1 + (number_of_pics%2));
        angle += delta;
    }
    
    this.setState({
      number_of_pics: number_of_pics,
      pic_positions: a,
      position_variant: position_variant
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
    var size_pics = "circle tasks-pics-"+number_of_pics
    for(i = 2; i <= number_of_pics; i++){
      var task_pic_i
      if(i == 2)      var task_pic_i = task.pic2
      else if(i == 3) var task_pic_i = task.pic3
      else if(i == 4) var task_pic_i = task.pic4
      else if(i == 5) var task_pic_i = task.pic5
      else if(i == 6) var task_pic_i = task.pic6
      else if(i == 7) var task_pic_i = task.pic7
      else if(i == 8) var task_pic_i = task.pic8
      var the_pic = <Picture4 classSizePics={size_pics} task_pic={task_pic_i} toAnswer={this.toAnswer} answer={this.state.answer} pic_positions={this.state.pic_positions} item={i} key={i}/>
      pics.push(the_pic)
    }

    var button_to_answer
    if(this.props.status_current_task == 0){
      button_to_answer = <button className="btn-m btn-m-3 btn-m-3a icon-heart-2 get-answer" onClick={this.acceptAnswer}>Ответить</button>
    }

    var content_position_variant0 = '', content_position_variant1 = ''
    if(!this.state.position_variant){
      content_position_variant0 = (
        <div className='wrap-general-picture'>
          <img className='general-picture' src={task.pic1} />
        </div>
      );
    }else{
      content_position_variant1 = (
        <div className='wrap-general-picture'>
          <img className='general-picture' src={task.pic1} />
        </div>
      );
    }
    content = (
      <div>
        <div className='content-task-type' id='type_task4'>
          {content_position_variant0}
          <div className='functional-pictures'>
            {pics}
          </div>
          {content_position_variant1}
        </div>
      </div>
    );
    return (
      <div className='task-participate  animated fadeIn'>
        <h2 className='h--thin mbm'><span className='prxs'>Одна статичная картинка, а другие, как варианты ответов</span> <span className='tag tag--light tag--heading tag--heading--h2'>6 лет</span></h2>
        {content}
        {button_to_answer}
      </div>
    );
  }
})
