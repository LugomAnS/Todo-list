import { memo } from "react";
import { TaskType } from "./TodoList"

type TasksListPropsType = {
  tasks: Array<TaskType>,
  remove: (value: string) => void,
  changeTaskStatus: (id: string, value: boolean) => void
}

function TasksList(props: TasksListPropsType) {
  return (
    <ul>
      {props.tasks.length > 0
      ? (
          props.tasks.map(item => (
            <li key={item.id} className={item.isDone ? 'task-done' : 'task'}>
              <input type="checkbox"
                checked={item.isDone}
                onChange={(e) => props.changeTaskStatus(item.id, e.currentTarget.checked)}
              /> <span>{item.title}</span>
              <button onClick={() => props.remove(item.id)}>X</button>
            </li>
          ) )
      )
      : <div>Нет добавленных задач</div>}
    </ul>
  )
}

export default memo(TasksList);