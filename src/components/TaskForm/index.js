import './styles.css';
import {handleTitle, handleWorkload, handleSubmit} from './controller';
import {useState} from 'react';

const TaskFormComponent = ({
  createTask,
}) => {
  const [title, setTitle] = useState('');
  const [workload, setWorkload] = useState(0);

  return (
    <div>
      <h2>New Task</h2>
      <form>
        <label>
          Title:
          <input type="text" value={title} onChange={handleTitle(setTitle)} />
        </label>
        <label>
          Workload:
          <input type="number" value={workload} onChange={handleWorkload(setWorkload)} />
        </label>
        <button type='submit' onClick={handleSubmit(createTask, title, workload)}>Create</button>
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