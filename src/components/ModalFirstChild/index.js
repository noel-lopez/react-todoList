import './styles.css'
import Modal from "../Modal"

const ModalFirstChildComponent = ({
  show,
  onClose,
  setStatusResponse,
}) => {

  const onPendingClick = () => {
    setStatusResponse('pending')
    onClose()
  }

  const onInProgressClick = () => {
    setStatusResponse('in progress')
    onClose()
  }

  const onDoneClick = () => {
    setStatusResponse('done')
    onClose()
  }

  return (
    <Modal
      show={show}
      onClose={onPendingClick}
      isFirstChildModal
      setStatusResponse={setStatusResponse}
    >
      <h2>⚠ CUIDADO ⚠</h2>
      <p>Estas creando subtarea de una tarea padre que tiene un estado distinto a "Pending"</p>
      <p>¿Que status quieres que tenga la subtarea que estas creando?</p>
      <div className="modalButtonsContainer">
        <button onClick={onPendingClick} className="pendingButton">Pending</button>
        <button onClick={onInProgressClick} className="inProgressButton">In Progress</button>
        <button onClick={onDoneClick} className="doneButton">Done</button>
      </div>
    </Modal>
  )
}

export default function ModalFirstChild({
  show,
  onClose,
  setStatusResponse,
}) {
  return (
    <ModalFirstChildComponent 
      show={show}
      onClose={onClose}
      setStatusResponse={setStatusResponse}
    />
  )
}