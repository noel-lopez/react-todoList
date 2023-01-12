export const emojisDict = {
  'pending': '😴',
  'in progress': '👨🏻‍💻',
  'done': '✅',
  'moveUp': '⬆',
  'moveDown': '⬇',
  'delete': '❌',
  'goToTask': '🚪'
}

export const emojisDictForUser = {
  'pending': 'Pending',
  'in progress': 'In progress',
  'done': 'Done',
  'moveUp': 'Move task up',
  'moveDown': 'Move task down',
  'delete': 'Delete task',
  'goToTask': 'Open task'
}

export const getEmoji = (word) => {
  if (emojisDict[word]) {
    return emojisDict[word];
  } else {
    return '🤷🏻‍♂️';
  }
}

export const renderDict = () => {
  return Object.keys(emojisDict).map((key, index) => (
    <p key={index}>
      {emojisDictForUser[key]}: {emojisDict[key]}
    </p>
  ))
}