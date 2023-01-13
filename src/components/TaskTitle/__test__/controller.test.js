import {
  tasksMock,
} from '../../TodoList/controller';
import {
  getTitle,
} from '../controller';

describe('TaskTitle controller', () => {
  let tasks;
  beforeEach(() => {
    tasks = [...tasksMock];
  })
  describe("getTitle", () => {
    it("should return 🏠 when parentIndex is an empty array", () => {
      const parentIndex = [];
      expect(getTitle(parentIndex, tasks)).toEqual("🏠");
    });

    it("should return the correct title", () => {
      const parentIndex = [1, 0];
      expect(getTitle(parentIndex, tasks)).toEqual("🏠 > Subtask 2 > Subtask 2.1");
    });
  })
})
