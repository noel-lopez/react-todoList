export const handleTitle = (event, setTitle) => {
  setTitle(event.target.value);
}

export const handleWorkload = (event, setWorkload) => {
  const {value} = event.target;
  const isNumber = !isNaN(parseInt(value));
  isNumber ? setWorkload(parseInt(value)) : setWorkload(0);
}

const clearForm = (setTitle, setWorkload) => {
  setTitle('');
  setWorkload(0);
}

export const handleSubmit = (event, createTask, setTitle, setWorkload ,title, workload) => {
  event.preventDefault();
  createTask({
    title,
    workload,
    status: "pending",
    subtasks: []
  })
  clearForm(setTitle, setWorkload);
}