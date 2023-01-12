import './styles.css';
import {
  createTask,
  getTitle,
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

  /*
    todolist:
    - TODO refactor: put the task h1 inside the TaskTitle component
    - TODO refactor: make the columns a component with props title and tasksToShow
  */
  return (
    <>
      {/* <button onClick={() => console.log(tasks)}>Log tasks</button> */}
      <EmojisLegend />
      <TaskForm createTask={(task) => createTask(parentIndex, tasks, setTasks, task)} />
      <h1><button onClick={() => goBack(parentIndex, setParentIndex)}>{"<"}</button>{getTitle(parentIndex, tasks)}</h1>
      <TaskTitle parentIndex={parentIndex} tasks={tasks} />
      <div className="todoList">
        <div className="column">
          <h2>Pending</h2>
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
        <div className="column">
          <h2>In Progress</h2>
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
        <div className="column">
          <h2>Done</h2>
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