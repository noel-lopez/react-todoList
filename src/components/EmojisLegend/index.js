import './styles.css';
import {
  renderDict
} from './controller';

const EmojisLegendComponent = () => {
  return (
    <fieldset>
      <legend>Buttons</legend>
      {renderDict()}
    </fieldset>
  )
}

export default function EmojisLegend() {
  return (
    <EmojisLegendComponent />
  )
}