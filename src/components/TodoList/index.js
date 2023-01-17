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
import Modal from '../Modal';

const TodoListComponent = ({
  parentIdx,
  tasksList,
}) => {
  const [parentIndex, setParentIndex] = useState(parentIdx)
  const [tasks, setTasks] = useState(tasksList)
  const [showModalUpdateAll, setShowModalUpdateAll] = useState(false)
  const [showModalChildStatus, setShowModalChildStatus] = useState(false)

  const closeModalUpdateAll = () => setShowModalUpdateAll(false);
  const openModalUpdateAll = () => setShowModalUpdateAll(true);
  const closeModalChildStatus = () => setShowModalChildStatus(false);
  const openModalChildStatus = () => setShowModalChildStatus(true);

  const onGoBackButtonClick = () => goBack(parentIndex, setParentIndex);

  const appContainerClass = showModalUpdateAll ? 'appContainer modalOpen' : 'appContainer';

  return (
    <div className={appContainerClass}>
      <button onClick={openModalUpdateAll}>Modal</button>
      <button onClick={openModalChildStatus}>Modal status</button>
      <Modal show={showModalUpdateAll} onClose={closeModalUpdateAll} onConfirm={() => console.log("Confirm")}>
        <h2>⚠ CUIDADO ⚠</h2>
        <p>Estas intentando actualizar una tarea que tiene subtareas.</p>
        <p>Recomendamos que en estos casos actualices las subtareas en lugar de la tarea padre.</p>
        <p>Aun asi, ¿quieres actualizar la tarea padre y todas sus subtareas?</p>
      </Modal>
      <Modal show={showModalChildStatus} onClose={closeModalChildStatus} isStatusModal setStatusResponse={(status) => console.log(status)}>
        <h2>⚠ CUIDADO ⚠</h2>
        <p>Estas creando subtarea de una tarea padre que tiene un estado distinto a "Pending"</p>
        <p>¿Que status quieres que tenga la subtarea que estas creando?</p>
      </Modal>
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