import './styles.css';
import {
  handleTitle, 
  handleWorkload, 
  handleSubmit
} from './controller';
import {useState} from 'react';

const TaskFormComponent = ({
  createTask,
}) => {
  const [title, setTitle] = useState('');
  const [workload, setWorkload] = useState(0);

  const onTitleInputChange = (event) => {
    handleTitle(event, setTitle);
  }

  const onWorkloadInputChange = (event) => {
    handleWorkload(event, setWorkload);
  }

  const onCreateTaskButtonClick = (event) => {
    handleSubmit(event, createTask, setTitle, setWorkload, title, workload);
  }

  const workloadInputValue = workload === 0 ? "" : workload;

  return (
    <div>
      <h2>New Task</h2>
      <form>
        <label>
          Title:
          <input type="text" value={title} onChange={onTitleInputChange} />
        </label>
        <label>
          Workload:
          <input type="number" value={workloadInputValue} onChange={onWorkloadInputChange} />
        </label>
        <button type='submit' onClick={onCreateTaskButtonClick}>Create</button>
      </form>
    </div>
  )
}

export default function TaskForm({
  createTask
}) {
  return (
    <TaskFormComponent 
      createTask={createTask}
    />
  )
}