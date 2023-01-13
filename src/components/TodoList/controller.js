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

// TODO extra: when creating the first task of a parent that is in progress or done, ask user the new subtask status (same as parent or pending)
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
  if(task.subtasks.length > 1) return true;
  if(task.subtasks.length === 1) return hasMoreThanOneChild(task.subtasks[0]);
  return false;
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

// TODO extra: show Modal asking for update all subtasks or not, instead of just not updating anything
const setStatus = (task, newStatus) => {
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
  /*
    PARENT TASK STATUS:
    - one subtask: same status as subtask
    - more than one subtask:
      - all subtasks done: done
      - at least one subtask in progress or done: in progress
      - all subtasks pending: pending
  */
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

const checkPrevTaskIndex = (parentIndex, tasksList, task) => {
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