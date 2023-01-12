import { getParentTask } from "../TodoList/controller";
import {getEmoji} from '../EmojisLegend/controller'

export const getParentWorkload = (parentIndex, tasks) => {
  let parent = getParentTask(parentIndex, tasks);
  return parent.workload;
}

export const getParentStatus = (parentIndex, tasks) => {
  let parent = getParentTask(parentIndex, tasks);
  return parent.status+" " + getEmoji(parent.status);
}