import './styles.css';
import {
  tasksMock,
  goBack,
  createTask,
  getPendingTasks,
  getInProgressTasks,
  getDoneTasks,
  updateSingleTask,
  modalUpdateAllOpening,
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

  const modalUpdateAllOpeningClick = () => {
    modalUpdateAllOpening(tasks, parentIndex, setTaskToUpdate, setStatusToUpdate, openModalUpdateAll)
  }

  return (
    <div className={appContainerClass}>
      <button onClick={modalUpdateAllOpeningClick}>Modal update all</button>
      <button onClick={openModalFirstChild}>Modal first child</button>
      <ModalUpdateAll 
        show={showModalUpdateAll} 
        onClose={closeModalUpdateAll} 
        updateAll={updateSingleTask}
        taskToUpdate={taskToUpdate}
        statusToUpdate={statusToUpdate}
        tasksList={tasks}
        parentIdx={parentIndex}
        setTasks={setTasks}
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