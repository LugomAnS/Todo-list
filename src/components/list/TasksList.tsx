import { memo } from "react";
import { TaskType } from "./TodoList"

type TasksListPropsType = {
  tasks: Array<TaskType>,
}

function TasksList({tasks}: TasksListPropsType) {
  return (
    <ul>
      {tasks.length > 0
      ? (
        tasks.map(item => <li key={item.id} ><input type="checkbox" checked={item.isDone} /> <span>{item.title}</span></li> )
      )
      : <div>Нет добавленных задач</div>}
    </ul>
  )
}

export default memo(TasksList);