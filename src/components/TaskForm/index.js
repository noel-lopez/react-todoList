import './styles.css';
import {handleTitle, handleWorkload, handleSubmit} from './controller';
import {useState} from 'react';

const TaskFormComponent = ({
  createTask,
}) => {
  const [title, setTitle] = useState('');
  const [workload, setWorkload] = useState(0);

  // TODO refactor: asbtract inputs onChange and workload input value

  return (
    <div>
      <h2>New Task</h2>
      <form>
        <label>
          Title:
          <input type="text" value={title} onChange={(event) => handleTitle(event, setTitle)} />
        </label>
        <label>
          Workload:
          <input type="number" value={workload === 0 ? "" : workload} onChange={(event) => handleWorkload(event, setWorkload)} />
        </label>
        <button type='submit' onClick={(event) => handleSubmit(event, createTask, setTitle, setWorkload, title, workload)}>Create</button>
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