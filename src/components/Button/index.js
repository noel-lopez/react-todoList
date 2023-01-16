import './styles.css';
import {
  getButtonClass
} from './controller';

const ButtonComponent = ({
  type="button",
  renderWhen=true,
  text="button",
  rounded=false,
  square=false,
  onClick= () => {}
}) => {

  const buttonClass = getButtonClass({rounded, square});
  return (
    <>
      {renderWhen && <button type={type} className={buttonClass} onClick={onClick}>{text}</button>}
    </>
  )
}

export default function Button({
  type,
  onClick,
  renderWhen,
  text,
  rounded,
  square
}) {
  return (
    <ButtonComponent 
      type={type}
      renderWhen={renderWhen}
      text={text}
      onClick={onClick}
      rounded={rounded}
      square={square}
    />
  )
}