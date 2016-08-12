const Picture2 = React.createClass({
  render: function() {
    var answer = this.props.answer
    var item = this.props.item
    var class_choosed_pic = this.props.classSizePics

    return (
      <img className={class_choosed_pic} src={this.props.task_pic}/>
    );
  }
})

const ButtonYN = React.createClass({
  //BEGIN***************************************************DECLARE
  acceptAnswer: function(){   
      // Когда компонент кликнут, вызываем обработчик onClick, 
      // который был передан атрибутом при создании:
      this.props.onClick(this.props.item);
  },
  render: function() {
    var answer = this.props.answer
    var item = this.props.item
    var class_pressed_button = "btn-m btn-m-2 btn-m-2i get-answer get-answer-YN " + this.props.classSizePics
    if(answer == item){
      class_pressed_button += ' pressed_button'
    }
    return (
      <button className={class_pressed_button} onClick={this.acceptAnswer}>{this.props.textButton}</button>
    );
  }
})

//Выбор правильного ответа, кликнув на картинку, ответ только один.
const Task2 = React.createClass({
  //BEGIN***************************************************DECLARE
  toAnswerTaskType: function(param_answer){
    this.props.acceptAnswer(param_answer)
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
      var the_pic = <Picture2 classSizePics={size_pics} task_pic={task_pic_i} answer={this.props.answer} item={i} key={i}/>
      pics.push(the_pic)
    }

    var button_to_answer
    if(this.props.status_current_task == 0){
      button_to_answer = (
        <div>
          <ButtonYN textButton="ДА" onClick={this.toAnswerTaskType} item={1} answer={this.props.answer} />
          <ButtonYN textButton="НЕТ" onClick={this.toAnswerTaskType} item={2} answer={this.props.answer} />
        </div>
      );
    }

    content = (
      <div>
        <div className='content-task-type' id='type_task2'>
          {pics}
        </div>
      </div>
    );
    return (
      <div className='task-participate  animated fadeIn'>
        <h2 className='h--thin mbm'><span className='prxs'>Выбор правильного ответа</span> <span className='tag tag--light tag--heading tag--heading--h2'>7 лет</span></h2>
        {content}
        {button_to_answer}
      </div>
    );
  }
})
