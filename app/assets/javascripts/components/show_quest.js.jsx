const ShowQuest = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    tasks_url: React.PropTypes.string.isRequired
  },
  getInitialState: function () {
    return {
      complete_task: false,
      tasks: [],
      status_quest_tasks: [],
      num_current_task: 0,
      //status_current_task: 0,   // 0 в процессе ответа, -1 неправильно, 1 правильно
      sum_right_answers: 0,
      sum_answers: 0,           // сколько ответов уже было дано
      number_of_attempts: 0,
      score: this.props.score,
      answer: 0,
      error_message: 0,          // 0 не открыта форма для отправки ошибки, 1 форма открыта, 2 нажата кнопка СООБЩИТЬ об ошибке
      price: 90,
      information_repeat_task: 0
    };
  },
  componentDidMount: function() {
    this.loadTasksFromServer();
  },
  componentWillUnmount: function(){
  },
  loadTasksFromServer: function() {
    $.ajax({
      url: this.props.tasks_url,
      dataType: 'json',
      data: {
        count: this.state.tasks_count
      },
      cache: false,
      success: function(data) {
        var a = []
        for (var i = 0; i < data.length; i++){
          a.push(0)
        }
        this.setState({
          complete_task: false,
          tasks: data,
          status_quest_tasks: a
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("Ошибка", status, err.toString());
      }.bind(this)
    });
  },
  chooseQuestTask: function(item){
    this.setState({
      num_current_task: item
    });
  },
  task_result: function(task_status){
    if(task_status == 1){
      return(
        <div className='card right-task-result result-task animated slideInDown'>
          <img src='/images/task_result/success2.png' />
          <h1>Правильно!</h1>
        </div>
      );
    }else if(task_status == -1){
      return(
        <div className='card wrong-task-result result-task animated slideInDown'>
          <img src='/images/task_result/error2.png' />
          <h1>Ошибся! Попробуй еще разок.</h1>
        </div>
      );
    }
  },
  repeatTask: function() {
    var num_current_task = this.state.num_current_task
    var a = this.state.status_quest_tasks
    a[num_current_task] = 0
    this.setState({
      status_quest_tasks: a,
      answer: 0
    });
  },
  nextTask: function() {
    var mySound = new buzz.sound("/sounds/camera_flashing", {
        formats: [ "mp3", "aac", "ogg" ],
        preload: true,
        autoplay: true,
        loop: false
    });
    num_current_task = this.state.num_current_task

    if(num_current_task == this.state.tasks.length - 1){
      for(var i = 0; i < this.state.tasks.length; i++){
        if(this.state.status_quest_tasks[i] != 1){
          num_current_task = i
          break
        }
      }
    }else num_current_task = this.state.num_current_task + 1

    all_questions_comleted = true
    for(var i = 0; i < this.state.tasks.length; i++){
      if(this.state.status_quest_tasks[i] != 1){
        all_questions_comleted = false
        break
      }
    }
    if(all_questions_comleted) num_current_task = 9999999;
    

    this.setState({
      complete_task: false,
      num_current_task: num_current_task,
      number_of_attempts: 0,
      answer: 0,
      error_message: 0
    });
  },
  acceptAnswer: function(param_answer) {
    var num_current_task = this.state.num_current_task
    var user_answer = param_answer
    var real_answer = this.state.tasks[num_current_task].answer
    if(user_answer == real_answer){
      var mySound = new buzz.sound("/sounds/snap", {
          formats: [ "mp3", "aac", "ogg" ],
          preload: true,
          autoplay: true,
          loop: false
      });
      var a = this.state.status_quest_tasks
      a[num_current_task] = 1

      this.setState({
        sum_right_answers: this.state.sum_right_answers + 1,
        status_quest_tasks: a
      });

    }else{
      var mySound = new buzz.sound("/sounds/light_bulb_breaking", {
          formats: [ "mp3", "aac", "ogg" ],
          preload: true,
          autoplay: true,
          loop: false
      });

      var a = this.state.status_quest_tasks
      a[num_current_task] = -1
      
      this.setState({
        sum_answers: this.state.sum_answers + 1,
        status_quest_tasks: a
      });
    }
  },
  error_message: function() {
    this.setState({
      error_message: 1
    });
  },
  sendErrorMessage: function() {
    var num_current_task = this.state.num_current_task
    var text_error_message_input = ReactDOM.findDOMNode(this.refs.error_message)
    var text_error_message = text_error_message_input.value.trim()
    $.ajax({
      url: '/tasks/error_message',
      //dataType: 'json',
      type: 'POST',
      data: {
        task_id: this.state.tasks[num_current_task].id,
        text: text_error_message
      },
      success: function(data) {
        this.setState({
          error_message: 2
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("ОШИБКА при отправке сообщения об ошибке", status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var stage_tasks = this.state.tasks.map(function (task, i) {
        return (
          <QuestTask 
            key={task.id + 150}
            task={task}
            chooseQuestTask={this.chooseQuestTask}
            item={i}
            num_current_task={this.state.num_current_task}
            status_quest_tasks={this.state.status_quest_tasks}
            />
        );
    }.bind(this));
    var num_current_task = this.state.num_current_task
    var tasks = this.state.tasks.map(function (task) {
      switch (task.task_type) {
        case 1:
        // занести toANswer в task1
          return (
            <Task1
              key={task.id}
              task={task}   
              acceptAnswer={this.acceptAnswer}
              status_current_task={this.state.status_quest_tasks[num_current_task]}
              nextTask={this.nextTask}
              repeatTask={this.repeatTask}
              quest={this.props.quest}
              sum_right_answers={this.state.sum_answers}
              tasks_length={this.state.tasks.length}
              task_result={this.task_result}
              test={this.props.test}
              task_text_color={this.props.task_text_color}
              />
          );
          break
        case 2:
          return (
            <Task2
              key={task.id}
              task={task}
              answer={this.state.answer}
              acceptAnswer={this.acceptAnswer}
              status_current_task={this.state.status_quest_tasks[num_current_task]}
              nextTask={this.nextTask}
              repeatTask={this.repeatTask}
              quest={this.props.quest}
              sum_right_answers={this.state.sum_answers}
              tasks_length={this.state.tasks.length}
              task_result={this.task_result}
              task_text_color={this.props.task_text_color}
              />
          );
          break
        case 3:
          return (
            <Task3
              key={task.id}
              task={task}
              acceptAnswer={this.acceptAnswer}
              status_current_task={this.state.status_quest_tasks[num_current_task]}
              nextTask={this.nextTask}
              repeatTask={this.repeatTask}
              quest={this.props.quest}
              sum_right_answers={this.state.sum_answers}
              tasks_length={this.state.tasks.length}
              task_result={this.task_result}
              test={this.props.test}
              task_text_color={this.props.task_text_color}
              />
          );
          break
        case 4:
          return (
            <Task4
              key={task.id}
              task={task}
              acceptAnswer={this.acceptAnswer}
              status_current_task={this.state.status_quest_tasks[num_current_task]}
              nextTask={this.nextTask}
              repeatTask={this.repeatTask}
              quest={this.props.quest}
              sum_right_answers={this.state.sum_answers}
              tasks_length={this.state.tasks.length}
              task_result={this.task_result}
              test={this.props.test}
              task_text_color={this.props.task_text_color}
              />
          );
          break
        case 5:
          return (
            <Task5
              key={task.id}
              task={task}
              acceptAnswer={this.acceptAnswer}
              status_current_task={this.state.status_quest_tasks[num_current_task]}
              nextTask={this.nextTask}
              repeatTask={this.repeatTask}
              quest={this.props.quest}
              sum_right_answers={this.state.sum_answers}
              tasks_length={this.state.tasks.length}
              task_result={this.task_result}
              task_text_color={this.props.task_text_color}
              />
          );
          break
        case 6:
          return (
            <Task6
              key={task.id}
              task={task}
              acceptAnswer={this.acceptAnswer}
              status_current_task={this.state.status_quest_tasks[num_current_task]}
              nextTask={this.nextTask}
              repeatTask={this.repeatTask}
              quest={this.props.quest}
              sum_right_answers={this.state.sum_answers}
              tasks_length={this.state.tasks.length}
              task_result={this.task_result}
              task_text_color={this.props.task_text_color}
              />
          );
          break
        case 7:
          return (
            <Task7
              key={task.id}
              task={task}
              acceptAnswer={this.acceptAnswer}
              status_current_task={this.state.status_quest_tasks[num_current_task]}
              nextTask={this.nextTask}
              repeatTask={this.repeatTask}
              quest={this.props.quest}
              sum_right_answers={this.state.sum_answers}
              tasks_length={this.state.tasks.length}
              task_result={this.task_result}
              test={this.props.test}
              task_text_color={this.props.task_text_color}
              />
          );
          break
        case 8:
          return (
            <Task8
              key={task.id}
              task={task}
              acceptAnswer={this.acceptAnswer}
              status_current_task={this.state.status_quest_tasks[num_current_task]}
              nextTask={this.nextTask}
              repeatTask={this.repeatTask}
              quest={this.props.quest}
              sum_right_answers={this.state.sum_answers}
              tasks_length={this.state.tasks.length}
              task_result={this.task_result}
              task_text_color={this.props.task_text_color}
              />
          );
          break
        case 9:
          return (
            <Task9
              key={task.id}
              task={task}
              acceptAnswer={this.acceptAnswer}
              status_current_task={this.state.status_quest_tasks[num_current_task]}
              nextTask={this.nextTask}
              repeatTask={this.repeatTask}
              quest={this.props.quest}
              sum_right_answers={this.state.sum_answers}
              tasks_length={this.state.tasks.length}
              task_result={this.task_result}
              task_text_color={this.props.task_text_color}
              />
          );
          break
      }

    }.bind(this));

    var content_task = tasks[this.state.num_current_task]

    all_questions_comleted = true
    for(var i = 0; i < this.state.tasks.length; i++){
      if(this.state.status_quest_tasks[i] != 1){
        all_questions_comleted = false
        break
      }
    }
      
    if(this.state.num_current_task > 0 && all_questions_comleted){
      content_task = (
        <div className='card mbl next-quest invite-after-test'>
          <div className='col col-2of6'>
            <img src='/images/robot_thumb_up.png' className='img-next-quest'/>
          </div>
          <div className='col col-4of6 content'>
            <h1>Замечательно</h1>
            <div className='invitation-tomorrow'>Ты справился с этим квестом!</div>
            <div className='actions'>
              <a className='btn btn-our-red the-end-of-test' href='/quests/passed'>Ещё квесты</a>
            </div>
          </div>
          <div className='clear'></div>
        </div>
      );
    }
    var score = this.state.score

    var profile = (
        <Profile
          key={1}
          score={score}
          monster_avatar={this.props.monster_avatar}
          monster_name={this.props.monster_name}
          profile_link={this.props.profile_link}
          monster_card_link={this.props.monster_card_link}
          setting_link={this.props.setting_link}
          />
      );
    
    var style_task_text = {
      color: this.props.task_text_color,
    };
    var content_error_message
    if(this.state.num_current_task < this.state.tasks.length){
      content_error_message = <p onClick={this.error_message} style={style_task_text}>В задании ошибка? Сообщите</p>
      if(this.state.error_message == 1){
        content_error_message=(
          <div className='content-task-error'>
            <div>
              <select ref='error_message'>
                <option disabled selected="selected" value='Не указано'>В чем проблема?</option>
                <option value='Проблема с картинкой'>Не понятно, что изображено на картинке</option>
                <option value='Проблема с картинкой'>Картинка отсутствует</option>
                <option value='Некорректный текст вопроса'>Некорректный текст вопроса</option>
                <option value='Задание не соответствует возрасту'>Задание не соответствует возрасту</option>
                <option value='Другое'>Другое</option>
              </select>
            </div>
            <button className='btn btn-our-green' onClick={this.sendErrorMessage}>Сообщить</button>
          </div>
        );
      }else if(this.state.error_message == 2){
        content_error_message=(
          <div className='content-task-error'>
            <h3>Спасибо! Совсем скоро мы исправим. Мы Вас любим <img src='/images/like_active.png' /></h3>
          </div>
        );
      }
    }

    return (
      <div>
        {profile}
        <div className='col col-task-main col-67proc ml-2proc mbl'>
          <div className='quest-tasks'>
            {stage_tasks}
          </div>
          <div className='clear'></div>
          {content_task}
          <div className='clear'></div>
        </div>
        <div className='task-error'>
          {content_error_message}
        </div>
      </div>
    );
  }
});

