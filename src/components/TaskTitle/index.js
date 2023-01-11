import './styles.css';
import {
  getParentWorkload,
  getParentStatus,
} from './controller';

const TaskTitleComponent = ({
  parentIndex,
  tasks
}) => {
  return (
    <div>
      <h3>Workload: {getParentWorkload(parentIndex, tasks)}</h3>
      <h3>Status: {getParentStatus(parentIndex, tasks)}</h3>
    </div>
  )
}

export default function TaskTitle({
  parentIndex,
  tasks
}) {
  return (
    <TaskTitleComponent 
      parentIndex={parentIndex}
      tasks={tasks}
    />
  )
}