import { memo } from "react";
import { TaskType } from "./TodoList"

type TasksListPropsType = {
  tasks: Array<TaskType>,
  remove: (value: string) => void,
}

function TasksList(props: TasksListPropsType) {
  return (
    <ul>
      {props.tasks.length > 0
      ? (
        props.tasks.map(item => (
          <li key={item.id} >
            <input type="checkbox" checked={item.isDone} /> <span>{item.title}</span>
            <button onClick={() => props.remove(item.id)}>X</button>
          </li>
        ) )
      )
      : <div>Нет добавленных задач</div>}
    </ul>
  )
}

export default memo(TasksList);