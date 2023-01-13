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
    let newWorkload = 0;
    task.subtasks.forEach((subtask) => {
      newWorkload += subtask.workload;
    })
    task.workload = newWorkload;
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