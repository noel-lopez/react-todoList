export const tasksMock = [
  {
    title: "Root",
    workload: 0,
    status: "pending",
    subtasks: [
      {
        title: "Subtask 1",
        workload: 3,
        status: "pending",
        subtasks: []
      },
      {
        title: "Subtask 2",
        workload: 2,
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
  // TODO refactor: use foreach instead of reduce
  return parentIdx.reduce((acc, curr) => {
    return acc.subtasks[curr];
  }, tasksList[0]);
};

export const createTask = (parentIdx, tasksList, setTasks, task) => {
  if(task.title === "") return;
  let auxTaskList = [...tasksList];
  let parent = getParentTask(parentIdx, auxTaskList);
  parent.subtasks.push(task);
  auxTaskList = updateTasks(auxTaskList);
  setTasks(auxTaskList);
}

// TODO: getTitle(parentIndex, tasks) - use recursion to get all the parents titles
export const getTitle = (parentIndex, tasksList) => {
  let parent = getParentTask(parentIndex, tasksList);
  return parent.title;
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

export const updateStatus = (parentIndex, taskList, setTasks, task, newStatus) => {
  let auxTaskList = [...taskList];
  let parent = getParentTask(parentIndex, auxTaskList);
  let idx = parent.subtasks.indexOf(task);
  parent.subtasks[idx] = setStatus(parent.subtasks[idx], newStatus);
  updateTasks(auxTaskList, setTasks);
  setTasks(auxTaskList);
}

const setStatus = (task, newStatus) => {
  // if task has more than one child, we dont update anything and console log a warning
  if (hasMoreThanOneChild(task)) {
    // TODO: show Modal asking for update all subtasks or not, instead of just not updating anything
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