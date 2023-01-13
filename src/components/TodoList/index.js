import './styles.css';
import {
  createTask,
  getPendingTasks,
  getInProgressTasks,
  getDoneTasks,
  updateStatus,
  deleteTask,
  goToTask,
  goBack,
  tasksMock,
  moveUp,
  moveDown,
} from './controller';
import { useState } from 'react';
import TaskForm from '../TaskForm';
import TaskTitle from '../TaskTitle';
import Card from '../Card';
import EmojisLegend from '../EmojisLegend';



const TodoListComponent = ({
  parentIdx = [],
  tasksList = tasksMock
}) => {
  const [parentIndex, setParentIndex] = useState(parentIdx)
  const [tasks, setTasks] = useState(tasksList)

  const onGoBackButtonClick = () => {
    goBack(parentIndex, setParentIndex);
  }

  // TODO refactor: make the columns a component with props title and tasksToShow
  // TODO big refactor: make a button component with type, onClick, condition to render and text as props
  return (
    <>
      {/* <button onClick={() => console.log(tasks)}>Log tasks</button> */}
      <EmojisLegend />
      <TaskForm createTask={(task) => createTask(parentIndex, tasks, setTasks, task)} />
      <TaskTitle parentIndex={parentIndex} tasks={tasks} onGoBackButtonClick={onGoBackButtonClick} />
      <div className="todoList">
        <div className="column">
          <h2>Pending</h2>
          <div className='cardsContainer'>
            {
              getPendingTasks(parentIndex, tasks).map((task, index) => (
                <Card
                  key={index}
                  task={task}
                  changeStatus={(newStatus) => updateStatus(parentIndex, tasks, setTasks, task, newStatus)}
                  deleteTask={() => deleteTask(parentIndex, tasks, setTasks, task)}
                  goToTask={() => goToTask(parentIndex, setParentIndex, tasks, task)}
                  goUp={() => moveUp(parentIndex, tasks, setTasks, task)}
                  goDown={() => moveDown(parentIndex, tasks, setTasks, task)}
                />
              ))
            }
          </div>
        </div>
        <div className="column">
          <h2>In progress</h2>
          <div className='cardsContainer'>
            {
              getInProgressTasks(parentIndex, tasks).map((task, index) => (
                <Card
                  key={index}
                  task={task}
                  changeStatus={(newStatus) => updateStatus(parentIndex, tasks, setTasks, task, newStatus)}
                  deleteTask={() => deleteTask(parentIndex, tasks, setTasks, task)}
                  goToTask={() => goToTask(parentIndex, setParentIndex, tasks, task)}
                  goUp={() => moveUp(parentIndex, tasks, setTasks, task)}
                  goDown={() => moveDown(parentIndex, tasks, setTasks, task)}
                />
              ))
            }
          </div>
        </div>
        <div className="column">
          <h2>Done</h2>
          <div className='cardsContainer'>
            {
              getDoneTasks(parentIndex, tasks).map((task, index) => (
                <Card
                  key={index}
                  task={task}
                  changeStatus={(newStatus) => updateStatus(parentIndex, tasks, setTasks, task, newStatus)}
                  deleteTask={() => deleteTask(parentIndex, tasks, setTasks, task)}
                  goToTask={() => goToTask(parentIndex, setParentIndex, tasks, task)}
                  goUp={() => moveUp(parentIndex, tasks, setTasks, task)}
                  goDown={() => moveDown(parentIndex, tasks, setTasks, task)}
                />
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default function TodoList({
  parentIdx,
  tasksList
}) {
  return (
    <TodoListComponent 
      parentIdx={parentIdx}
      tasksList={tasksList}
    />
  )
}