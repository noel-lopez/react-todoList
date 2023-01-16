import './styles.css';
// import {logTask} from './controller';
import {getEmoji} from '../EmojisLegend/controller'

const CardComponent = ({
  task,
  changeStatus,
  deleteTask,
  goToTask,
  goUp,
  goDown
}) => {
  // TODO: use svg icons instead of emojis

  const onPendingButtonClick = () => changeStatus("pending");
  const onInProgressButtonClick = () => changeStatus("in progress");
  const onDoneButtonClick = () => changeStatus("done");
  const pendingEmoji = getEmoji("pending");
  const inProgressEmoji = getEmoji("in progress");
  const doneEmoji = getEmoji("done");
  const deleteEmoji = getEmoji("delete");
  const goToTaskEmoji = getEmoji("goToTask");

  return (
    <div className="card">
      <h3>{getEmoji(task.status)} {task.title}</h3>
      <p>{task.workload}</p>
      {/* <button onClick={() => logTask(task)}>log</button> */}
      <button onClick={goUp}>⬆</button>
      <button onClick={goDown}>⬇</button>
      {task.status !== 'pending' && (<button onClick={onPendingButtonClick}> {pendingEmoji} </button>)}
      {task.status !== 'in progress' && (<button onClick={onInProgressButtonClick}> {inProgressEmoji} </button>)}
      {task.status !== 'done' && (<button onClick={onDoneButtonClick}> {doneEmoji} </button>)}
      <button onClick={deleteTask}> {deleteEmoji} </button>
      <button onClick={goToTask}> {goToTaskEmoji} </button>
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