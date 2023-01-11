export const logTask = (task) => {
  console.log(task);
}

export const getEmoji = (status) => {
  switch(status) {
    case 'pending':
      return '😴';
    case 'in progress':
      return '👨🏻‍💻';
    case 'done':
      return '✅';
    default:
      return '🤷🏻‍♂️';
  }
}