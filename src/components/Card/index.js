import './styles.css';
// import {logTask} from './controller';
import {getEmoji} from '../EmojisLegend/controller'
import Button from '../Button'

const CardComponent = ({
  task,
  changeStatus,
  deleteTask,
  goToTask,
  goUp,
  goDown
}) => {
  // TODO: use svg icons instead of emojis

  /* const onPendingButtonClick = () => changeStatus("pending");
  const onInProgressButtonClick = () => changeStatus("in progress");
  const onDoneButtonClick = () => changeStatus("done");
  const pendingEmoji = getEmoji("pending");
  const inProgressEmoji = getEmoji("in progress");
  const doneEmoji = getEmoji("done"); */
  const deleteEmoji = getEmoji("delete");
  const goToTaskEmoji = getEmoji("goToTask");

  const dragStart = (event) => {
    const taskString = JSON.stringify(task);
    event.dataTransfer.setData("task", taskString);
  }

  return (
    <div className="card" draggable onDragStart={dragStart}>
      <h3>{getEmoji(task.status)} {task.title}</h3>
      <p>{task.workload}</p>
      {/* <button onClick={() => logTask(task)}>log</button> */}
      <Button
        onClick={goUp}
        text="⬆"
        square
      />
      <Button
        onClick={goDown}
        text="⬇"
        square
      />
      {/* <Button 
        onClick={onPendingButtonClick}
        text={pendingEmoji}
        square
        renderWhen={task.status !== 'pending'}
      />
      <Button
        onClick={onInProgressButtonClick}
        text={inProgressEmoji}
        square
        renderWhen={task.status !== 'in progress'}
      />
      <Button
        onClick={onDoneButtonClick}
        text={doneEmoji}
        square
        renderWhen={task.status !== 'done'}
      /> */}
      <Button
        onClick={deleteTask}
        text={deleteEmoji}
        square
      />
      <Button
        onClick={goToTask}
        text={goToTaskEmoji}
        square
      />
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