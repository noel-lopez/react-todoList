import './styles.css';
import {
  tasksMock,
  goBack,
  createTask,
  getPendingTasks,
  getInProgressTasks,
  getDoneTasks,
} from './controller';
import { useState } from 'react';
import TaskForm from '../TaskForm';
import TaskTitle from '../TaskTitle';
import EmojisLegend from '../EmojisLegend';
import Column from '../Column';



const TodoListComponent = ({
  parentIdx = [],
  tasksList = tasksMock
}) => {
  const [parentIndex, setParentIndex] = useState(parentIdx)
  const [tasks, setTasks] = useState(tasksList)

  const onGoBackButtonClick = () => {
    goBack(parentIndex, setParentIndex);
  }

  return (
    <>
      {/* <button onClick={() => console.log(tasks)}>Log tasks</button> */}
      <EmojisLegend />
      <TaskForm createTask={(task) => createTask(parentIndex, tasks, setTasks, task)} />
      <TaskTitle parentIndex={parentIndex} tasks={tasks} onGoBackButtonClick={onGoBackButtonClick} />
      <div className="todoList">
        <Column
          title="Pending"
          tasksToShow={getPendingTasks(parentIndex, tasks)}
          parentIndex={parentIndex}
          setParentIndex={setParentIndex}
          tasks={tasks}
          setTasks={setTasks}
        />
        <Column
          title="In progress"
          tasksToShow={getInProgressTasks(parentIndex, tasks)}
          parentIndex={parentIndex}
          setParentIndex={setParentIndex}
          tasks={tasks}
          setTasks={setTasks}
        />
        <Column
          title="Done"
          tasksToShow={getDoneTasks(parentIndex, tasks)}
          parentIndex={parentIndex}
          setParentIndex={setParentIndex}
          tasks={tasks}
          setTasks={setTasks}
        />
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