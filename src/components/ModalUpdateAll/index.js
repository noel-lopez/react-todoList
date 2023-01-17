import Modal from '../Modal';

const ModalUpdateAllComponent = ({
  show,
  updateAll,
  onClose,
  taskToUpdate,
  statusToUpdate,
  tasksList,
  parentIdx,
}) => {

  const onConfirmClick = () => {
    updateAll(tasksList, parentIdx, taskToUpdate, statusToUpdate)
    onClose()
  }

  return (
    <Modal
      show={show}
      onClose={onClose}
      onConfirm={onConfirmClick}
    >
      <h2>⚠ CUIDADO ⚠</h2>
      <p>Estas intentando actualizar una tarea que tiene subtareas.</p>
      <p>Recomendamos que en estos casos actualices las subtareas en lugar de la tarea padre.</p>
      <p>Aun asi, ¿quieres actualizar la tarea padre y todas sus subtareas?</p>
    </Modal>

  )
}

export default function ModalUpdateAll({
  show,
  updateAll,
  onClose,
  taskToUpdate,
  statusToUpdate,
  tasksList,
  parentIdx,
}) {
  return (
    <ModalUpdateAllComponent 
      show={show}
      updateAll={updateAll}
      onClose={onClose}
      taskToUpdate={taskToUpdate}
      statusToUpdate={statusToUpdate}
      tasksList={tasksList}
      parentIdx={parentIdx}
    />
  )
}