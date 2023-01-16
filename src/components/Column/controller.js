import { updateTasks, getParentTask } from '../TodoList/controller.js';

const hasMoreThanOneChild = (task) => {
  if(task.subtasks.length > 1) return true;
  if(task.subtasks.length === 1) return hasMoreThanOneChild(task.subtasks[0]);
  return false;
}

// TODO extra: show Modal asking for update all subtasks or not, instead of just not updating anything
export const setStatus = (task, newStatus) => {
  if (hasMoreThanOneChild(task)) {
    alert("Warning: You are trying to update the status of a task with mutiple subtasks. Please update the status of the subtasks instead.");
    return task;
  } else {
    if(task.subtasks.length === 1) {
      task.subtasks[0] = setStatus(task.subtasks[0], newStatus);
    }
  }
  task.status = newStatus;
  return task;
}

export const updateStatus = (parentIndex, taskList, setTasks, task, newStatus) => {
  let auxTaskList = [...taskList];
  let parent = getParentTask(parentIndex, auxTaskList);
  parent.subtasks = parent.subtasks.filter(t => t !== task);
  let newTask = setStatus(task, newStatus);
  parent.subtasks.push(newTask);
  updateTasks(auxTaskList, setTasks);
  setTasks(auxTaskList);
}

export const deleteTask = (parentIdx, tasksList, setTasks, task) => {
  let auxTaskList = [...tasksList];
  let parent = getParentTask(parentIdx, auxTaskList);
  let idx = parent.subtasks.indexOf(task);
  parent.subtasks.splice(idx, 1);
  auxTaskList = updateTasks(auxTaskList);
  setTasks(auxTaskList);
}

export const goToTask = (parentIndex, setParentIndex, tasksList, task) => {
  let parent = getParentTask(parentIndex, tasksList);
  let idx = parent.subtasks.indexOf(task);
  setParentIndex([...parentIndex, idx]);
}

export const checkPrevTaskIndex = (parentIndex, tasksList, firstTask, currTask) => {
  if(!currTask) currTask = firstTask;
  let parent = getParentTask(parentIndex, tasksList);
  let idx = parent.subtasks.indexOf(currTask);
  if(idx === 0) {
    return -1;
  }
  let prevTask = parent.subtasks[idx - 1];
  if(prevTask.status === firstTask.status) {
    return idx - 1;
  }
  return checkPrevTaskIndex(parentIndex, tasksList, firstTask, prevTask);
}

export const moveUp = (parentIndex, tasksList, setTasks, task) => {
  let auxTaskList = [...tasksList];
  let parent = getParentTask(parentIndex, auxTaskList);
  let idx = parent.subtasks.indexOf(task);
  if(idx === 0) {
    return;
  }
  let prevTaskIndex = checkPrevTaskIndex(parentIndex, auxTaskList, task);
  if(prevTaskIndex === -1) {
    return;
  }
  let prevTask = parent.subtasks[prevTaskIndex];
  parent.subtasks[idx] = prevTask;
  parent.subtasks[prevTaskIndex] = task;
  console.log("moving up")
  setTasks(auxTaskList);
}

export const checkNextTaskIndex = (parentIndex, tasksList, firstTask, currTask) => {
  if(!currTask) currTask = firstTask;
  let parent = getParentTask(parentIndex, tasksList);
  let idx = parent.subtasks.indexOf(currTask);
  if(idx === parent.subtasks.length - 1) {
    return -1;
  }
  let nextTask = parent.subtasks[idx + 1];
  if(nextTask.status === firstTask.status) {
    return idx + 1;
  }
  return checkNextTaskIndex(parentIndex, tasksList, firstTask, nextTask);
}

export const moveDown = (parentIndex, tasksList, setTasks, task) => {
  let auxTaskList = [...tasksList];
  let parent = getParentTask(parentIndex, auxTaskList);
  let idx = parent.subtasks.indexOf(task);
  if(idx === parent.subtasks.length - 1) {
    return;
  }
  let nextTaskIndex = checkNextTaskIndex(parentIndex, auxTaskList, task);
  if(nextTaskIndex === -1) {
    return;
  }
  let nextTask = parent.subtasks[nextTaskIndex];
  parent.subtasks[idx] = nextTask;
  parent.subtasks[nextTaskIndex] = task;
  console.log("moving down")
  setTasks(auxTaskList);
}