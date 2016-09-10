const AddTaskToQuest = React.createClass({
  //BEGIN***************************************************DECLARE
  getInitialState: function () {
    return null
  },
  addTaskToQuest: function(){
    var task_id_input = ReactDOM.findDOMNode(this.refs.task_id)
    var quest_id_input = ReactDOM.findDOMNode(this.refs.quest_id)
    var age_input = ReactDOM.findDOMNode(this.refs.age)

    var task_id = task_id_input.value.trim(), quest_id = quest_id_input.value.trim(), age = age_input.value.trim()
    $.ajax({
      url: '/quests/get_add_task_to_quest',
      //dataType: 'json',
      type: 'POST',
      data: {
        task_id: task_id,
        quest_id: quest_id,
        age: age
      },
      success: function(data) {
      }.bind(this),
      error: function(xhr, status, err) {
        console.error("ОШИБКА", status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    return (
      <div className='create-task'>
        <h2>Добавление задания в квест</h2>
        <input type="number" ref='quest_id' placeholder='id квеста'/>
        <select ref='age'>
          <option disabled>Возраст</option>
          <option value='age3'>age3</option>
          <option value='age4'>age4</option>
          <option value='age5'>age5</option>
          <option value='age6'>age6</option>
          <option value='age7'>age7</option>
          <option value='age8'>age8</option>
          <option value='age9'>age9</option>
          <option value='age10'>age10</option>
        </select>
        <input type="number" ref='task_id' placeholder='id задания'/>
        <button className='btn btn-our-red' onClick={this.addTaskToQuest}>Добавить</button>
      </div>
    );
  }
});

