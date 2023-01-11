import { getParentTask } from "../TodoList/controller";

export const getParentWorkload = (parentIndex, tasks) => {
  let parent = getParentTask(parentIndex, tasks);
  return parent.workload;
}

export const getParentStatus = (parentIndex, tasks) => {
  let parent = getParentTask(parentIndex, tasks);
  return parent.status;
}