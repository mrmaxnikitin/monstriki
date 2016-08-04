const Picture1 = React.createClass({
  //BEGIN***************************************************DECLARE
  clickHandler: function(){   
      // Когда компонент кликнут, вызываем обработчик onClick, 
      // который был передан атрибутом при создании:
      this.props.onClick(this.props.item);
  },
  render: function() {
    var answer = this.props.answer
    var item = this.props.item
    var class_choosed_pic = this.props.classSizePics
    if(answer == item){
      class_choosed_pic += ' choosed_pic'
    }
    return (
      <img className={class_choosed_pic} src={this.props.task_pic} onClick={this.clickHandler}/>
    );
  }
})

//Выбор правильного ответа, кликнув на картинку, ответ только один.
const Task1 = React.createClass({
  //BEGIN***************************************************DECLARE
  toAnswerTaskType: function(item){
    this.props.toAnswer(item)
  },
  render: function() {
    var task = this.props.task
    var content
    var number_of_pics = 8;
    if(task.pic8 == "") number_of_pics -= 1;
    if(task.pic7 == "") number_of_pics -= 1;
    if(task.pic6 == "") number_of_pics -= 1;
    if(task.pic5 == "") number_of_pics -= 1;
    if(task.pic4 == "") number_of_pics -= 1;
    if(task.pic3 == "") number_of_pics -= 1;
    if(task.pic2 == "") number_of_pics -= 1;
    if(task.pic1 == "") number_of_pics -= 1;

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
      var the_pic = <Picture1 classSizePics={size_pics} task_pic={task_pic_i} onClick={this.toAnswerTaskType} answer={this.props.answer} item={i} key={i}/>
      pics.push(the_pic)
    }

    var button_to_answer
    if(this.props.status_current_task == 0){
      button_to_answer = <button className="btn-m btn-m-3 btn-m-3a icon-heart-2 get-answer" onClick={this.props.acceptAnswer}>Ответить</button>
    }

    content = (
      <div>
        <div className='content-task-type' id='type_task1'>
          {pics}
        </div>
      </div>
    );
    return (
      <div className='task-participate  animated fadeIn'>
        <h2 className='h--thin mbm'><span className='prxs'>Выбор правильного ответа</span> <span className='tag tag--light tag--heading tag--heading--h2'>Легко</span></h2>
        {content}
        {button_to_answer}
      </div>
    );
  }
})
