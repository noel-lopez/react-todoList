import './styles.css';
import {
  getTitle,
  getParentWorkload,
  getParentStatus,
} from './controller';

const TaskTitleComponent = ({
  parentIndex,
  tasks,
  onGoBackButtonClick
}) => {
  const title = getTitle(parentIndex, tasks);
  return (
    <div>
      <h1><button onClick={onGoBackButtonClick}>{"<"}</button>{title}</h1>
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