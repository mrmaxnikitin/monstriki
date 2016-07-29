const Logic = React.createClass({
  //BEGIN***************************************************DECLARE
  render: function() {
    var task = this.props.task

    var content
      if(task.task_type == 1){
        content = (
          <div>
            <h2 className='h--thin mbm'><span className='prxs'>Тренируем логику</span> <span className='tag tag--light tag--heading tag--heading--h2'>Легко</span></h2>
            <div id='type_task1'>
              <img className='moving_element' src={task.pic1}/>
              <img className='moving_element' src={task.pic2}/>
              <img className='moving_element' src={task.pic1}/>
              <img className='moving_element' src={task.pic4}/>
              <img className='moving_element' src={task.pic3}/>
              <img className='moving_element' src={task.pic2}/>
            </div>
          </div>
        );
      }
      else
        content = 'aaa'
    return (
      <div className='task-participate'>
        {content}
      </div>
    );
  }
})
