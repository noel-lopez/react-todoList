export const tasksMock = [
  {
    title: "Root",
    workload: 6,
    status: "in progress",
    subtasks: [
      {
        title: "Subtask 1",
        workload: 3,
        status: "pending",
        subtasks: []
      },
      {
        title: "Subtask 2",
        workload: 3,
        status: "in progress",
        subtasks: [
          {
            title: "Subtask 2.1",
            workload: 3,
            status: "in progress",
            subtasks: []
          },
        ]
      },
    ],
  },
]

export const getParentTask = (parentIdx, tasksList) => {
  if (parentIdx.length === 0) {
    return tasksList[0];
  }
  let acc = tasksList[0];
  parentIdx.forEach((index) => {
    acc = acc.subtasks[index];
  })
  return acc;
};

export const createTask = (parentIdx, tasksList, setTasks, task) => {
  if(task.title === "") {
    alert("Task title can't be empty");
    return;
  };
  let auxTaskList = [...tasksList];
  let parent = getParentTask(parentIdx, auxTaskList);
  parent.subtasks.push(task);
  auxTaskList = updateTasks(auxTaskList);
  setTasks(auxTaskList);
}

export const getTitle = (parentIndex, tasksList) => {
  if(parentIndex.length === 0) return "🏠";
  let parent = getParentTask(parentIndex, tasksList);
  let parentTitle = parent.title;
  let parentParentIndex = parentIndex.slice(0, parentIndex.length - 1);
  let parentparentTitle = getTitle(parentParentIndex, tasksList);
  return parentparentTitle + " > " + parentTitle;
}

export const getPendingTasks = (parentIndex, tasksList) => {
  let parent = getParentTask(parentIndex, tasksList);
  return parent.subtasks.filter(task => task.status === "pending");
}

export const getInProgressTasks = (parentIndex, tasksList) => {
  let parent = getParentTask(parentIndex, tasksList);
  return parent.subtasks.filter(task => task.status === "in progress");
}

export const getDoneTasks = (parentIndex, tasksList) => {
  let parent = getParentTask(parentIndex, tasksList);
  return parent.subtasks.filter(task => task.status === "done");
}

const hasMoreThanOneChild = (task) => {
  // recursion to check if the task has more than one child or if has only one child with more than one child
  if(task.subtasks.length > 1) return true;
  if(task.subtasks.length === 1) return hasMoreThanOneChild(task.subtasks[0]);
  return false;
}

// TODO extra: move task to the end of the list when updating status
export const updateStatus = (parentIndex, taskList, setTasks, task, newStatus) => {
  let auxTaskList = [...taskList];
  let parent = getParentTask(parentIndex, auxTaskList);
  // remove task from auxTaskList
  parent.subtasks = parent.subtasks.filter(t => t !== task);
  // add task to the end of the list with the new status
  let newTask = setStatus(task, newStatus);
  parent.subtasks.push(newTask);
  // update tasks
  updateTasks(auxTaskList, setTasks);
  setTasks(auxTaskList);
}

// TODO extra: show Modal asking for update all subtasks or not, instead of just not updating anything
const setStatus = (task, newStatus) => {
  if (hasMoreThanOneChild(task)) {
    alert("Warning: You are trying to update the status of a task with mutiple subtasks. Please update the status of the subtasks instead.");
    return task;
  } else {
    // if task has only one child, we update the status of the child and the parent
    if(task.subtasks.length === 1) {
      task.subtasks[0] = setStatus(task.subtasks[0], newStatus);
    }
  }
  task.status = newStatus;
  return task;
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

export const goBack = (parentIndex, setParentIndex) => {
  if (parentIndex.length === 0) {
    return;
  }
  let auxParentIndex = [...parentIndex];
  auxParentIndex.pop();
  setParentIndex(auxParentIndex);
}

export const updateTasks = (tasksList) => {
  console.log("updateTasks")
  let auxTaskList = [...tasksList];
  auxTaskList = updateTasksWorkload(auxTaskList);
  auxTaskList = updateTasksStatus(auxTaskList);
  return auxTaskList;
}

const updateTasksWorkload = (tasksList) => {
  // a parent workload is the sum of all his subtasks workload
  // use recursion to update all the tasks
  tasksList.forEach((task) => {
    updateTasksWorkload(task.subtasks);
    if(task.subtasks.length === 0) {
      return task;
    }
    task.workload = task.subtasks.reduce((acc, subtask) => acc + subtask.workload, 0);
  });
  return tasksList;
}

const updateTasksStatus = (tasksList) => {
  // a parent task status is the subtask status when has only one subtask
  // a parent task status is done if all his subtasks are done
  // a parent task status is in progress if at least one of his subtasks is in progress or done
  // a parent task status is pending if all his subtasks are pending
  // use recursion to update all the tasks
  tasksList.forEach((task) => {
    updateTasksStatus(task.subtasks)
    if(task.subtasks.length === 0) {
      return task;
    }
    if(task.subtasks.length === 1) {
      task.status = task.subtasks[0].status;
      return task;
    }
    let done = task.subtasks.filter(subtask => subtask.status === "done");
    let inProgress = task.subtasks.filter(subtask => subtask.status === "in progress");
    let pending = task.subtasks.filter(subtask => subtask.status === "pending");
    if(done.length === task.subtasks.length) {
      task.status = "done";
      return task;
    }
    if(pending.length === task.subtasks.length) {
      task.status = "pending";
      return task;
    }
    if(inProgress.length > 0 || done.length > 0) {
      task.status = "in progress";
      return task;
    }
  });
  return tasksList;
}

// TODO extra: be able to move task position in the column

const checkPrevTaskIndex = (parentIndex, tasksList, task) => {
  // check previous index of task with the same status of the task
  let parent = getParentTask(parentIndex, tasksList);
  let idx = parent.subtasks.indexOf(task);
  if(idx === 0) {
    return -1;
  }
  let prevTask = parent.subtasks[idx - 1];
  if(prevTask.status === task.status) {
    return idx - 1;
  }
  return checkPrevTaskIndex(parentIndex, tasksList, prevTask);
}

const checkNextTaskIndex = (parentIndex, tasksList, task) => {
  // check next index of task with the same status of the task
  let parent = getParentTask(parentIndex, tasksList);
  let idx = parent.subtasks.indexOf(task);
  if(idx === parent.subtasks.length - 1) {
    return -1;
  }
  let nextTask = parent.subtasks[idx + 1];
  if(nextTask.status === task.status) {
    return idx + 1;
  }
  return checkNextTaskIndex(parentIndex, tasksList, nextTask);
}

export const moveUp = (parentIndex, tasksList, setTasks, task) => {
  // move up to the previous task with the same status
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

export const moveDown = (parentIndex, tasksList, setTasks, task) => {
  // move down to the next task with the same status
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