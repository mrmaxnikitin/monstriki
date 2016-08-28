const LogicTasks = React.createClass({
  //BEGIN***************************************************DECLARE
  propTypes: {
    tasks_url: React.PropTypes.string.isRequired
  },
  getInitialState: function () {
    return {
      complete_task: false,
      tasks_count: 2,
      tasks: [],
      status_quest_tasks: [],
      num_current_task: 0,
      status_current_task: 0,   // 0 в процессе ответа, -1 неправильно, 1 правильно
      sum_right_answers: 0,
      number_of_attempts: 0,
      score: this.props.score,
      answer: 0
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
        var a = new Array()
        for (var i = 0; i < data.length; i++){
          a.push(false)
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
      num_current_task: item,
      status_current_task: 0
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
    this.setState({
      status_current_task: 0,
      answer: 0
    });
  },
  nextTask: function() {
    var new_num_current_task = this.state.num_current_task + 1
    if(this.props.quest){
      for(var i = 0; i < this.state.tasks.length; i++){
        if(!this.state.status_quest_tasks[i]){
          new_num_current_task = i
          break
        }
      }
    }
    this.setState({
      complete_task: false,
      num_current_task: new_num_current_task,
      status_current_task: 0,
      number_of_attempts: 0,
      answer: 0
    });
  },
  acceptAnswer: function(param_answer) {
    var num_current_task = this.state.num_current_task
    var user_answer = param_answer
    var real_answer = this.state.tasks[num_current_task].answer
    /*if(this.state.tasks[num_current_task].task_type == 2 || this.state.tasks[num_current_task].task_type == 3){
      user_answer = param_answer
    }*/
    var score = this.state.score
    var number_of_attempts = this.state.number_of_attempts

    if(user_answer == real_answer){
      var a = this.state.status_quest_tasks
      a[num_current_task] = true

      var new_score
      if(this.props.complete_quest)
        new_score = score
      else
        new_score = score + 2 - number_of_attempts

      $.ajax({
        url: '/tasks/reward',
        //dataType: 'json',
        type: 'POST',
        data: {
          score: new_score
        },
        success: function(data) {
          this.setState({
            status_current_task: 1,
            score: new_score,
            sum_right_answers: this.state.sum_right_answers + 1,
            status_quest_tasks: a
          });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error("ОШИБКА", status, err.toString());
        }.bind(this)
      });

      if((this.state.sum_right_answers == this.state.tasks.length-1 && this.props.quest) || (this.state.tasks.length == 1 && this.props.quest)){
        var score_for_quest = 10
        if(this.props.complete_quest) score_for_quest = 0;
        $.ajax({
          url: '/quests/finish_trip',
          //dataType: 'json',
          type: 'POST',
          data: {
            score: new_score + score_for_quest
          },
          success: function(data) {
          }.bind(this),
          error: function(xhr, status, err) {
            console.error("ОШИБКА1", status, err.toString());
          }.bind(this)
        });
      }

    }else{
      var number_of_attempts = this.state.number_of_attempts + 1
      if(number_of_attempts > 1) number_of_attempts = 1
      this.setState({
        status_current_task: -1,
        number_of_attempts: number_of_attempts
      });
    }
  },
  render: function() {
    var stage_tasks
    if(this.props.quest){
      stage_tasks = this.state.tasks.map(function (task, i) {
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
    }
    var tasks = this.state.tasks.map(function (task) {
      switch (task.task_type) {
        case 1:
        // занести toANswer в task1
          return (
            <Task1
              key={task.id}
              task={task}   
              acceptAnswer={this.acceptAnswer}
              status_current_task={this.state.status_current_task}
              nextTask={this.nextTask}
              repeatTask={this.repeatTask}
              quest={this.props.quest}
              sum_right_answers={this.state.sum_right_answers}
              tasks_length={this.state.tasks.length}
              task_result={this.task_result}
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
              status_current_task={this.state.status_current_task}
              nextTask={this.nextTask}
              repeatTask={this.repeatTask}
              quest={this.props.quest}
              sum_right_answers={this.state.sum_right_answers}
              tasks_length={this.state.tasks.length}
              />
          );
          break
        case 3:
          return (
            <Task3
              key={task.id}
              task={task}
              acceptAnswer={this.acceptAnswer}
              status_current_task={this.state.status_current_task}
              nextTask={this.nextTask}
              repeatTask={this.repeatTask}
              quest={this.props.quest}
              sum_right_answers={this.state.sum_right_answers}
              tasks_length={this.state.tasks.length}
              />
          );
          break
        case 4:
          return (
            <Task4
              key={task.id}
              task={task}
              acceptAnswer={this.acceptAnswer}
              status_current_task={this.state.status_current_task}
              nextTask={this.nextTask}
              repeatTask={this.repeatTask}
              quest={this.props.quest}
              sum_right_answers={this.state.sum_right_answers}
              tasks_length={this.state.tasks.length}
              />
          );
          break
        case 5:
          return (
            <Task5
              key={task.id}
              task={task}
              acceptAnswer={this.acceptAnswer}
              status_current_task={this.state.status_current_task}
              nextTask={this.nextTask}
              repeatTask={this.repeatTask}
              quest={this.props.quest}
              sum_right_answers={this.state.sum_right_answers}
              tasks_length={this.state.tasks.length}
              />
          );
          break
        case 6:
          return (
            <Task6
              key={task.id}
              task={task}
              acceptAnswer={this.acceptAnswer}
              status_current_task={this.state.status_current_task}
              nextTask={this.nextTask}
              repeatTask={this.repeatTask}
              quest={this.props.quest}
              sum_right_answers={this.state.sum_right_answers}
              tasks_length={this.state.tasks.length}
              />
          );
          break
        case 7:
          return (
            <Task7
              key={task.id}
              task={task}
              acceptAnswer={this.acceptAnswer}
              status_current_task={this.state.status_current_task}
              nextTask={this.nextTask}
              repeatTask={this.repeatTask}
              quest={this.props.quest}
              sum_right_answers={this.state.sum_right_answers}
              tasks_length={this.state.tasks.length}
              />
          );
          break
        case 8:
          return (
            <Task8
              key={task.id}
              task={task}
              acceptAnswer={this.acceptAnswer}
              status_current_task={this.state.status_current_task}
              nextTask={this.nextTask}
              repeatTask={this.repeatTask}
              quest={this.props.quest}
              sum_right_answers={this.state.sum_right_answers}
              tasks_length={this.state.tasks.length}
              />
          );
          break
        case 9:
          return (
            <Task9
              key={task.id}
              task={task}
              acceptAnswer={this.acceptAnswer}
              status_current_task={this.state.status_current_task}
              nextTask={this.nextTask}
              repeatTask={this.repeatTask}
              quest={this.props.quest}
              sum_right_answers={this.state.sum_right_answers}
              tasks_length={this.state.tasks.length}
              />
          );
          break
      }

    }.bind(this));

    var content_task = tasks[this.state.num_current_task]
    if(this.state.num_current_task >= this.state.tasks.length && !this.props.quest){
      content_task = (
        <div className='tac'>
          <a href='/tasks'><button className="btn-m btn-m-4 btn-m-4c icon-arrow-right the-end-of-train">Дальше</button></a>
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

    return (
      <div>
        {profile}
        <div className='col col-task-main col-67proc ml-2proc'>
          <div className='quest-tasks'>
            {stage_tasks}
          </div>
          <div className='clear'></div>
          {content_task}
        </div>
      </div>
    );
  }
});

