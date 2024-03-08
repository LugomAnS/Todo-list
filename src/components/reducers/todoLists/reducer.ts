import { TodoListType } from "../../../App";
import { ListActionsKeys, ListReducerType } from "./types";

let initialState: TodoListType[] = []

export function listReducer<key extends ListActionsKeys>(
  state: TodoListType[] = initialState,
  action: ListReducerType[key]
): TodoListType[] {
  switch (action.type) {
    case "ADD-LIST":
      const newToDoList: TodoListType = {
        id: action.payload.id,
        title: action.payload.title,
        filter: "all",
      };
      return [...state, newToDoList];
    case "DELETE-LIST":
      return state.filter(el => el.id !== action.payload.id);
    case "CHANGE-TITLE":
      return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el );
    case "CHANGE-FILTER":
      return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
    default:
      return state;
  }
}
