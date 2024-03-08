import { v1 } from "uuid";
import { TaskType } from "../../list/TodoList";
import { TaskStateType } from "../../../App";
import { TaskReducerType, TasksActionsKeys } from "./types";
import { ListReducerType } from "../todoLists/types";

let initialState: TaskStateType = {};

export function taskReducer<key extends TasksActionsKeys>(
  state: TaskStateType = initialState,
  action: TaskReducerType[key] | ListReducerType['deleteListAC']
): TaskStateType {
  switch (action.type) {
    case "REMOVE-TASK":
      return {
        ...state,
        [action.payload.listId]: state[action.payload.listId].filter(
          (el) => el.id !== action.payload.taskId
        ),
      };
    case "ADD-TASK":
      const newTask: TaskType = {
        id: v1(),
        title: action.payload.title,
        isDone: false,
      };
      return {
        ...state,
        [action.payload.listId]: [...state[action.payload.listId], newTask],
      };
    case "CHANGE-STATUS":
      return {
        ...state,
        [action.payload.listId]: state[action.payload.listId].map((el) =>
          el.id === action.payload.taskId
            ? { ...el, isDone: action.payload.value }
            : el
        ),
      };
    case "CHANGE-TITLE":
      return {
        ...state,
        [action.payload.listId]: state[action.payload.listId].map((el) =>
          el.id === action.payload.taskId
            ? { ...el, title: action.payload.value }
            : el
        ),
      };
    case "CREATE-LIST":
      return { ...state, [action.payload.listId]: [] };
    case "DELETE-LIST":
      const newState = {...state};
      delete newState[action.payload.id]
      return newState;
    default:
      return state;
  }
}
