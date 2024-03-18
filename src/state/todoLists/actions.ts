import { FilterType } from "../../App"

export const addToDoListAC = (id: string, title: string) => {
  return {
    type: "ADD-LIST",
    payload: { id, title }
  } as const
}

export const deleteListAC = (id: string) => {
  return {
    type: "DELETE-LIST",
    payload: { id }
  } as const
}

export const changeToDolistTitleAC = (id: string, title: string) => {
  return {
    type: "CHANGE-TITLE",
    payload: { id, title }
  } as const
}

export const changeListFilterAC = (id: string, filter: FilterType) => {
  return {
    type: "CHANGE-FILTER",
    payload: { id, filter }
  } as const
}