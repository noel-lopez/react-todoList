import './styles.css';
import {
  createTask,
  getTitle,
  getPendingTasks,
  getInProgressTasks,
  getDoneTasks,
  changeStatus,
  deleteTask,
  goToTask,
  goBack,
} from './controller';
import { useState } from 'react';
import TaskForm from '../TaskForm';
import TaskTitle from '../TaskTitle';
import Card from '../Card';

const TodoListComponent = ({
  parentIdx= [],
  tasksList= [
    {
      title: 'Root',
      workload: 0,
      status: 'pending',
      subtasks: []
    }
  ]
}) => {
  const [parentIndex, setParentIndex] = useState(parentIdx)
  const [tasks, setTasks] = useState(tasksList)

  /*
    todolist:
    - TODO: use props on changeStatus, deleteTask, goToTask (Card component)
    - TODO: think about props for createTask (TaskForm component)
  */
  return (
    <>
      <TaskForm createTask={createTask} />
      <h1><button onClick={() => goBack()}>go back</button>{getTitle(parentIndex, tasks)}</h1>
      <TaskTitle parentIndex={parentIndex} tasks={tasks} />
      <div className="todoList">
        <div className="column">
          <h2>Pending</h2>
          {
            getPendingTasks(parentIndex, tasks).map((task, index) => (
              <Card
                key={index}
                task={task}
                changeStatus={() => changeStatus()}
                deleteTask={() => deleteTask()}
                goToTask={() => goToTask()}
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
                changeStatus={() => changeStatus()}
                deleteTask={() => deleteTask()}
                goToTask={() => goToTask()}
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
                changeStatus={() => changeStatus()}
                deleteTask={() => deleteTask()}
                goToTask={() => goToTask()}
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