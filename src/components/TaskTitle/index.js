import './styles.css';
import {
  getTitle,
  getParentWorkload,
  getParentStatus,
} from './controller';
import Button from '../Button';

const TaskTitleComponent = ({
  parentIndex,
  tasks,
  onGoBackButtonClick
}) => {
  const title = getTitle(parentIndex, tasks);
  return (
    <div>
      <h1>
        <Button onClick={onGoBackButtonClick} text='<' rounded />
        {title}
      </h1>
      <h3>Workload: {getParentWorkload(parentIndex, tasks)}</h3>
      <h3>Status: {getParentStatus(parentIndex, tasks)}</h3>
    </div>
  )
}

export default function TaskTitle({
  parentIndex,
  tasks,
  onGoBackButtonClick
}) {
  return (
    <TaskTitleComponent 
      parentIndex={parentIndex}
      tasks={tasks}
      onGoBackButtonClick={onGoBackButtonClick}
    />
  )
}