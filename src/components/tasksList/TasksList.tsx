import { memo, useCallback } from "react";
import { TaskType } from "../list/TodoList";
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

function TasksList({tasks, remove, changeTaskStatus, changeTaskTitle}: TasksListPropsType) {
  const callbacks = {
    changeTaskTitle: useCallback((taskId: string, newTitle: string) =>
      changeTaskTitle(taskId, newTitle), [changeTaskTitle]),
    changeTaskStatus: useCallback((taskid: string, value: boolean) =>
      changeTaskStatus(taskid, value), [changeTaskStatus]),
    removeTask: useCallback((id: string) => remove(id), [remove]),
  };

  return (
    <ul>
      {tasks?.length > 0 ? (
        tasks.map((item) => (
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
            <IconButton onClick={() => callbacks.removeTask(item.id)}>
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
