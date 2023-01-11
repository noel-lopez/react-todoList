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
            status: "pending",
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
  return parentIdx.reduce((acc, curr) => {
    return acc.subtasks[curr];
  }, tasksList[0]);
};

export const createTask = (parentIdx, tasksList, setTasks, task) => {
  if(task.title === "") return;
  let auxTaskList = [...tasksList];
  let parent = getParentTask(parentIdx, auxTaskList);
  parent.subtasks.push(task);
  setTasks(auxTaskList);
}

// TODO: getTitle(parentIndex, tasks) - use recursion to get all the parents titles

export const getTitle = (parentIndex, tasks) => {
  let parent = getParentTask(parentIndex, tasks);
  return parent.title;
}

export const getPendingTasks = (parentIndex, tasks) => {
  let parent = getParentTask(parentIndex, tasks);
  return parent.subtasks.filter(task => task.status === "pending");
}

export const getInProgressTasks = (parentIndex, tasks) => {
  let parent = getParentTask(parentIndex, tasks);
  return parent.subtasks.filter(task => task.status === "in progress");
}

export const getDoneTasks = (parentIndex, tasks) => {
  let parent = getParentTask(parentIndex, tasks);
  return parent.subtasks.filter(task => task.status === "done");
}

// TODO: changeStatus() - do function and add necessary props

export const changeStatus = () => {

}

// TODO: deleteTask() - do function and add necessary props

export const deleteTask = () => {

}

export const goToTask = (parentIndex, setParentIndex, tasks, task) => {
  let parent = getParentTask(parentIndex, tasks);
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