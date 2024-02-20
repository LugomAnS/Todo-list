export const removeTaskAC = (listId: string, taskId: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: { listId, taskId },
  } as const
}

export const addTaskAC = (listId: string, title: string) => {
  return {
    type: "ADD-TASK",
    payload: { listId, title }
  } as const
}

export const changeStatusAC = (listId: string, taskId: string, value: boolean) => {
  return {
    type: "CHANGE-STATUS",
    payload: { listId, taskId, value }
  } as const
}

export const changeTaskTitleAC = (listId: string, taskId: string, value: string) => {
  return {
    type: "CHANGE-TITLE",
    payload: { listId, taskId, value }
  } as const
}

export const createEmptyTaskListAC = (listId: string) => {
  return {
    type: "CREATE-LIST",
    payload: { listId }
  } as const
}