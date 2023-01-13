import { getParentTask } from "../TodoList/controller";
import {getEmoji} from '../EmojisLegend/controller'

export const getTitle = (parentIndex, tasksList) => {
  if(parentIndex.length === 0) return "🏠";
  let parent = getParentTask(parentIndex, tasksList);
  let parentTitle = parent.title;
  let parentParentIndex = parentIndex.slice(0, parentIndex.length - 1);
  let parentparentTitle = getTitle(parentParentIndex, tasksList);
  return parentparentTitle + " > " + parentTitle;
}

export const getParentWorkload = (parentIndex, tasks) => {
  let parent = getParentTask(parentIndex, tasks);
  return parent.workload;
}

export const getParentStatus = (parentIndex, tasks) => {
  let parent = getParentTask(parentIndex, tasks);
  return parent.status+" " + getEmoji(parent.status);
}