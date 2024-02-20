import { memo } from "react";
import { TaskType } from "./TodoList";
import EditableSpan from "../edatableSpan/editableSpan";
import IconButton from "@mui/material/IconButton";
import CheckBox from "@mui/material/Checkbox";
import { Delete } from "@mui/icons-material";

type TasksListPropsType = {
  tasks: Array<TaskType>;
  remove: (value: string) => void;
  changeTaskStatus: (id: string, value: boolean) => void;
  changeTaskTitle: (taskId: string, value: string) => void;
};

function TasksList(props: TasksListPropsType) {
  const callbacks = {
    changeTaskTitle: (taskId: string, newTitle: string) =>
      props.changeTaskTitle(taskId, newTitle),
    changeTaskStatus: (taskid: string, value: boolean) =>
      props.changeTaskStatus(taskid, value),
  };

  return (
    <ul>
      {props.tasks?.length > 0 ? (
        props.tasks.map((item) => (
          <li key={item.id} className={item.isDone ? "task-done" : "task"}>
            <CheckBox
              checked={item.isDone}
              onChange={(e) =>
                callbacks.changeTaskStatus(item.id, e.currentTarget.checked)
              }
            />
            <EditableSpan
              title={item.title}
              onEdit={(value: string) =>
                callbacks.changeTaskTitle(item.id, value)
              }
            />
            &nbsp;
            <IconButton onClick={() => props.remove(item.id)}>
              <Delete />
            </IconButton>
          </li>
        ))
      ) : (
        <div>Нет добавленных задач</div>
      )}
    </ul>
  );
}

export default memo(TasksList);
