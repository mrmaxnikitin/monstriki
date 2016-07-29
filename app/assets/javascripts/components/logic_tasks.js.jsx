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
      num_current_task: 0,
      status_current_task: 0,   // 0 в процессе ответа, -1 неправильно, 1 правильно
      sum_right_answers: 0
    };
  },
  componentDidMount: function() {
    /*var current_answers = this.state.user_answers
    for (var i = 0; i < this.state.tasks_count; i++){
      current_answers.push([0, 0])
    }
    this.setState({
      user_answers: current_answers
    });*/
    this.loadTasksFromServer();
    //intervalID = setInterval(this.loadNewsItemsFromServer, this.props.pollInterval);
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
        this.setState({
          complete_task: false,
          tasks: data
        });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("Ошибка", status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var tasks = this.state.tasks.map(function (task) {   // подумать над реализацией, чтобы постоянно значения не мапились в tasks
      return (
        <Logic
          key={task.id}
          task={task}/>
      );
    }.bind(this));

    return (
      <div className='logic-tasks'>
        {tasks[this.state.num_current_task]}
        <button className="btn-m btn-m-3 btn-m-3a icon-heart-2 get-answer">Ответить</button>
        <button className="btn-m btn-m-3 btn-m-3e icon-arrow-right next-task">Следующее задание</button>
      </div>
    );
  }
});

