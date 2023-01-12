import './styles.css';
// import {logTask, getEmoji} from './controller';
import {getEmoji} from './controller';

const CardComponent = ({
  task,
  changeStatus,
  deleteTask,
  goToTask
}) => {
  return (
    <div className="card">
      <h3>{getEmoji(task.status)} {task.title}</h3>
      <p>{task.workload}</p>
      {/* <button onClick={() => logTask(task)}>log</button> */}
      {task.status !== 'pending' && (<button onClick={() => changeStatus("pending")}>pending</button>)}
      {task.status !== 'in progress' && (<button onClick={() => changeStatus("in progress")}>in progress</button>)}
      {task.status !== 'done' && (<button onClick={() => changeStatus("done")}>done</button>)}
      <button onClick={deleteTask}>delete</button>
      <button onClick={goToTask}>go</button>
    </div>
  )
}

export default function Card({
  task,
  changeStatus,
  deleteTask,
  goToTask
}) {
  return (
    <CardComponent 
      task={task}
      changeStatus={changeStatus}
      deleteTask={deleteTask}
      goToTask={goToTask}
    />
  )
}