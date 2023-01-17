import './styles.css';
import {} from './controller';

const ModalComponent = ({
  children,
  show,
  onClose,
  onConfirm,
  isStatusModal,
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
  const onConfirmClick = () => {
    onConfirm()
    onClose()
  }

  return (
    <>
      {show && (
      <div className="modal">
        <div className="modalContent">
          <div className="modalHeader">
            <button className="modalClose" onClick={onClose}>
              <span className="modalCloseIcon">X</span>
            </button>
          </div>
          <div className="modalBody">
            {children}
            { onConfirm && <div className="modalButtonsContainer">
              <button onClick={onClose} className="cancelButton">Cancel</button>
              <button onClick={onConfirmClick} className="confirmButton">Confirm</button>
            </div>}
            { isStatusModal && <div className="modalButtonsContainer">
              <button onClick={onPendingClick} className="pendingButton">Pending</button>
              <button onClick={onInProgressClick} className="inProgressButton">In Progress</button>
              <button onClick={onDoneClick} className="doneButton">Done</button>
            </div>}
          </div>
        </div>
      </div>
      )}
    </>
  )
}

export default function Modal({
  children,
  show,
  onClose,
  onConfirm,
  isStatusModal = false,
  setStatusResponse= () => {},
}) {
  return (
    <ModalComponent show={show} onClose={onClose} onConfirm={onConfirm} isStatusModal={isStatusModal} setStatusResponse={setStatusResponse}>
      {children}
    </ModalComponent>
  )
}