import './styles.css';
// import {logTask, getEmoji} from './controller';
import {getEmoji} from '../EmojisLegend/controller'

const CardComponent = ({
  task,
  changeStatus,
  deleteTask,
  goToTask,
  goUp,
  goDown
}) => {
  return (
    <div className="card">
      <h3>{getEmoji(task.status)} {task.title}</h3>
      <p>{task.workload}</p>
      {/* <button onClick={() => logTask(task)}>log</button> */}
      <button onClick={goUp}>⬆</button>
      <button onClick={goDown}>⬇</button>
      {task.status !== 'pending' && (<button onClick={() => changeStatus("pending")}>{getEmoji("pending")}</button>)}
      {task.status !== 'in progress' && (<button onClick={() => changeStatus("in progress")}> {getEmoji("in progress")} </button>)}
      {task.status !== 'done' && (<button onClick={() => changeStatus("done")}> {getEmoji("done")} </button>)}
      <button onClick={deleteTask}> {getEmoji("delete")} </button>
      <button onClick={goToTask}> {getEmoji("goToTask")} </button>
    </div>
  )
}

export default function Card({
  task,
  changeStatus,
  deleteTask,
  goToTask,
  goUp,
  goDown
}) {
  return (
    <CardComponent 
      task={task}
      changeStatus={changeStatus}
      deleteTask={deleteTask}
      goToTask={goToTask}
      goUp={goUp}
      goDown={goDown}
    />
  )
}