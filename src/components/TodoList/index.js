import './styles.css';
import {
  tasksMock,
  goBack,
  createTask,
  getPendingTasks,
  getInProgressTasks,
  getDoneTasks,
  getParentTask,
} from './controller';
import { useState } from 'react';
import TaskForm from '../TaskForm';
import TaskTitle from '../TaskTitle';
import EmojisLegend from '../EmojisLegend';
import Column from '../Column';
import ModalUpdateAll from '../ModalUpdateAll';
import ModalFirstChild from '../ModalFirstChild';

const TodoListComponent = ({
  parentIdx,
  tasksList,
}) => {
  const [parentIndex, setParentIndex] = useState(parentIdx)
  const [tasks, setTasks] = useState(tasksList)
  const [showModalUpdateAll, setShowModalUpdateAll] = useState(false)
  const [showModalFirstChild, setShowModalFirstChild] = useState(false)
  const [taskToUpdate, setTaskToUpdate] = useState({})
  const [statusToUpdate, setStatusToUpdate] = useState('')

  const closeModalUpdateAll = () => setShowModalUpdateAll(false);
  const openModalUpdateAll = () => setShowModalUpdateAll(true);
  const closeModalFirstChild = () => setShowModalFirstChild(false);
  const openModalFirstChild = () => setShowModalFirstChild(true);

  const onGoBackButtonClick = () => goBack(parentIndex, setParentIndex);

  const appContainerClass = showModalUpdateAll || showModalFirstChild ? 'appContainer modalOpen' : 'appContainer';

  // TODO refactor: move updateAll, updateSingleTask and modalUpdateAllOpening to controller.js
  const updateAll = (tasksList, parentIdx, statusToUpdate) => {
    let tasksListCopy = [...tasksList]
    const parentTask = getParentTask(parentIdx, tasksListCopy)
    const subtasks = parentTask.subtasks
    subtasks.forEach((subtask, idx) => {
      const updatedTask = {
        ...subtask,
        status: statusToUpdate
      }
      parentTask.subtasks[idx] = updatedTask
      if (subtask.subtasks.length > 0) {
        const newParentIdx = [...parentIdx, idx]
        updateAll(tasksListCopy, newParentIdx, statusToUpdate)
      }
    }
    )
    return tasksListCopy
  }

  const updateSingleTask = (tasksList, parentIdx, task, statusToUpdate) => {
    let tasksListCopy = [...tasksList]
    const parentTask = getParentTask(parentIndex, tasksList)
    const taskToUpdate = parentTask.subtasks.find(subtask => subtask.title === task.title)
    const taskToUpdateIndex = parentTask.subtasks.findIndex(subtask => subtask.title === task.title)
    const updatedTask = {
      ...taskToUpdate,
      status: statusToUpdate
    }
    parentTask.subtasks[taskToUpdateIndex] = updatedTask
    const newParentIdx = [...parentIdx, taskToUpdateIndex]
    tasksListCopy = updateAll(tasksListCopy, newParentIdx, statusToUpdate)
    setTasks(tasksListCopy)
  }

  const modalUpdateAllOpening = () => {
    const tasksList = [...tasks]
    const parentTask = getParentTask(parentIndex, tasksList)
    const taskToUpdate = parentTask.subtasks[1]
    const statusToUpdate = 'done'
    setTaskToUpdate(taskToUpdate)
    setStatusToUpdate(statusToUpdate)
    openModalUpdateAll()
  }

  return (
    <div className={appContainerClass}>
      <button onClick={modalUpdateAllOpening}>Modal update all</button>
      <button onClick={openModalFirstChild}>Modal first child</button>
      <ModalUpdateAll 
        show={showModalUpdateAll} 
        onClose={closeModalUpdateAll} 
        updateAll={updateSingleTask}
        taskToUpdate={taskToUpdate}
        statusToUpdate={statusToUpdate}
        tasksList={tasks}
        parentIdx={parentIndex}
      />
      <ModalFirstChild
        show={showModalFirstChild}
        onClose={closeModalFirstChild}
        setStatusResponse={(status) => console.log("Set status response:", status)}
      />
      <EmojisLegend />
      <TaskForm createTask={(task) => createTask(parentIndex, tasks, setTasks, task)} />
      <TaskTitle parentIndex={parentIndex} tasks={tasks} onGoBackButtonClick={onGoBackButtonClick} />
      <div className='todoList'>
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
    </div>
  )
}

export default function TodoList({
  parentIdx = [],
  tasksList = tasksMock
}) {
  return (
    <TodoListComponent 
      parentIdx={parentIdx}
      tasksList={tasksList}
    />
  )
}