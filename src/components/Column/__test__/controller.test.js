import { setStatus } from "../controller";
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
  // TODO: test for checkPrevTaskIndex and checkNextTaskIndex
});