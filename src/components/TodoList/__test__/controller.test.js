import {
  tasksMock,
  getParentTask,
  getTitle,
  getPendingTasks,
  getInProgressTasks,
  getDoneTasks,
  setStatus
} from "../controller";

describe("TodoList controller", () => {
  let tasks;
  beforeEach(() => {
    tasks = [...tasksMock];
  });

  describe("getParentTask", () => {
    it("should return the root task when parentIdx is an empty array", () => {
      const parentIdx = [];
      expect(getParentTask(parentIdx, tasks)).toEqual(tasks[0]);
    });

    it("should return the correct parent task", () => {
      const parentIdx = [0];
      const expectedTask = tasks[0].subtasks[0];
      expect(getParentTask(parentIdx, tasks)).toEqual(expectedTask);
    });
  });

  describe("getTitle", () => {
    it("should return 🏠 when parentIndex is an empty array", () => {
      const parentIndex = [];
      expect(getTitle(parentIndex, tasks)).toEqual("🏠");
    });

    it("should return the correct title", () => {
      const parentIndex = [1, 0];
      expect(getTitle(parentIndex, tasks)).toEqual("🏠 > Subtask 2 > Subtask 2.1");
    });
  });

  describe("getPendingTasks", () => {
    it("should return all pending tasks", () => {
      const parentIndex = [];
      const expectedTasks = [tasks[0].subtasks[0]];
      expect(getPendingTasks(parentIndex, tasks)).toEqual(expectedTasks);
    });
  });

  describe("getInProgressTasks", () => {
    it("should return all in progress tasks", () => {
      const parentIndex = [];
      const expectedTasks = [tasks[0].subtasks[1]];
      expect(getInProgressTasks(parentIndex, tasks)).toEqual(expectedTasks);
    });
  });

  describe("getDoneTasks", () => {
    it("should return an empty array if there are no done tasks", () => {
      const parentIndex = [];
      expect(getDoneTasks(parentIndex, tasks)).toEqual([]);
    });
  });

  describe("setStatus", () => {
    it("should update the status of a task", () => {
      const task = tasks[0].subtasks[0];
      const newStatus = "done";
      const expectedTask = {
        title: "Subtask 1",
        workload: 3,
        status: "done",
        subtasks: []
      };
      expect(setStatus(task, newStatus)).toEqual(expectedTask);
    });
  });
});
