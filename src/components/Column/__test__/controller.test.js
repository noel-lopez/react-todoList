import { setStatus, checkPrevTaskIndex } from "../controller";
import { tasksMock } from "../../TodoList/controller";

describe('Column controller', () => {
  let tasks;
  beforeEach(() => {
    tasks = [...tasksMock];
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
  describe("checkPrevTaskIndex", () => {
    it.skip("should return the index of the previous task with the same status", () => {
      // TODO: modify the mock so that the task has a previous task with the same status
      const task = tasks[0].subtasks[2];
      const expectedIndex = 1;
      expect(checkPrevTaskIndex([], tasks, task)).toEqual(expectedIndex);
    });
    it("should return -1 if there is no previous task with the same status", () => {
      const task = tasks[0].subtasks[0];
      const expectedIndex = -1;
      expect(checkPrevTaskIndex([], tasks, task)).toEqual(expectedIndex);
    });
  });
  // TODO: test for checkNextTaskIndex
});