import './styles.css';
import {
  emojisDict,
  emojisDictForUser,
} from './controller';

const EmojisLegendComponent = () => {

  const renderDict = () => {
    return Object.keys(emojisDict).map((key, index) => (
      <p key={index}>
        {emojisDictForUser[key]}: {emojisDict[key]}
      </p>
    ))
  }

  return (
    <fieldset>
      <legend>Icons</legend>
      {renderDict()}
    </fieldset>
  )
}

export default function EmojisLegend() {
  return (
    <EmojisLegendComponent />
  )
}