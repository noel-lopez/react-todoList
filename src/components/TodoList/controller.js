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

// TODO: createTask() - updateTasks before setTasks

export const createTask = (parentIdx, tasksList, setTasks, task) => {
  if(task.title === "") return;
  let auxTaskList = [...tasksList];
  let parent = getParentTask(parentIdx, auxTaskList);
  parent.subtasks.push(task);
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

// TODO: changeStatus() - updateTasks before setTasks
// TODO: prop to show Modal instead of console.log warning
export const changeStatus = (parentIndex, taskList, setTasks, task, newStatus) => {
  let auxTaskList = [...taskList];
  let parent = getParentTask(parentIndex, auxTaskList);
  let idx = parent.subtasks.indexOf(task);
  // check how many children tasks has the task to be updated
  let childrenTasks = parent.subtasks[idx].subtasks;
  // if the task has only one child, we can update child status
  if (childrenTasks.length === 1) {
    parent.subtasks[idx].subtasks[0].status = newStatus;
  }
  // if the task has more than one child, we dont update anything and console log a warning
  if (childrenTasks.length > 1) {
    console.log("Warning: the task has more than one child, so we dont update anything");
    return
  } 
  parent.subtasks[idx].status = newStatus;
  setTasks(auxTaskList);
}

// TODO: deleteTask() - updateTasks before setTasks
// TODO: handle the case when the task to be deleted is the last one: parent keeps his status and workload
export const deleteTask = (parentIdx, tasksList, setTasks, task) => {
  let auxTaskList = [...tasksList];
  let parent = getParentTask(parentIdx, auxTaskList);
  let idx = parent.subtasks.indexOf(task);
  parent.subtasks.splice(idx, 1);
  // the children task modify the parent, so we need to updateTask once time for every parent
  parentIdx.forEach((_, i) => {
    updateTasks(auxTaskList, parentIdx.slice(0, i));
  });
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

// TODO (BIG): update all the tasks list when a task is created, updated or deleted

export const updateTasks = (tasksList, setTasks, parentIndex=[]) => {
  let auxTaskList = [...tasksList];
  auxTaskList = updateTasksWorkload(auxTaskList);
  auxTaskList = updateTasksStatus(auxTaskList);
  setTasks(auxTaskList);
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