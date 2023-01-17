import './styles.css';
import {} from './controller';

const ModalComponent = ({
  children,
  show,
  onClose,
  onConfirm,
}) => {

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
}) {
  return (
    <ModalComponent show={show} onClose={onClose} onConfirm={onConfirm} >
      {children}
    </ModalComponent>
  )
}