import './styles.css';
import {
  updateStatus,
  deleteTask,
  goToTask,
  moveUp,
  moveDown,
} from './controller';
import Card from '../Card';

const ColumnComponent = ({
  title,
  tasksToShow,
  parentIndex,
  setParentIndex,
  tasks,
  setTasks,
}) => {

  const cardChangeStatus = (newStatus, task) => updateStatus(parentIndex, tasks, setTasks, task, newStatus);
  const cardDeleteTask = (task) => deleteTask(parentIndex, tasks, setTasks, task);
  const cardGoToTask = (task) => goToTask(parentIndex, setParentIndex, tasks, task);
  const cardGoUp = (task) => moveUp(parentIndex, tasks, setTasks, task);
  const cardGoDown = (task) => moveDown(parentIndex, tasks, setTasks, task);

  // TODO fix bug: sometimes cards doesn't move up or down
  return (
    <div className="column">
      <h2>{title}</h2>
      <div className='cardsContainer'>
        {
          tasksToShow.map((task, index) => (
            <Card
              key={index}
              task={task}
              changeStatus={(newStatus) => cardChangeStatus(newStatus, task)}
              deleteTask={() => cardDeleteTask(task)}
              goToTask={() => cardGoToTask(task)}
              goUp={() => cardGoUp(task)}
              goDown={() => cardGoDown(task)}
            />
          ))
        }
      </div>
    </div>
  )
}

export default function Column({
  title,
  tasksToShow,
  parentIndex,
  setParentIndex,
  tasks,
  setTasks,
}) {
  return (
    <ColumnComponent 
      title={title}
      tasksToShow={tasksToShow}
      parentIndex={parentIndex}
      setParentIndex={setParentIndex}
      tasks={tasks}
      setTasks={setTasks}
    />
  )
}