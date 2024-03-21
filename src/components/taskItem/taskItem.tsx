import { Delete } from "@mui/icons-material";
import EditableSpan from "../edatableSpan/editableSpan";
import { IconButton } from "@mui/material";
import CheckBox from "@mui/material/Checkbox";
import { TaskType } from "../todoListWithRedux/TodoListWithRedux";
import { ChangeEvent, memo } from "react";
import s from './styles.module.css';

type TaskItemPropspType = {
  listId: string;
  item: TaskType;
  changeStatus: (taskId: string, value: boolean) => void;
  changeTitle: (taskid: string, value: string) => void;
  removeTask: (taskId: string) => void;
};

function TaskItem(props: TaskItemPropspType) {

  const callbacks = {
    changeTaskStatus: (e: ChangeEvent<HTMLInputElement>) =>
      props.changeStatus(props.item.id, e.currentTarget.checked),
    changeTaskTitle: (value: string) =>
      props.changeTitle(props.item.id, value),
    removeTask: () => props.removeTask(props.item.id),
  };

  const taskStyle = (props.item.isDone ? s.TaskDone : s.Task) + " " + s.Descr;

  return (
    <div key={props.item.id} className={s.Wrapper}>
      <div className={taskStyle}>
        <CheckBox checked={props.item.isDone} onChange={callbacks.changeTaskStatus} />
        <EditableSpan title={props.item.title} onEdit={callbacks.changeTaskTitle} />
      </div>
      <IconButton onClick={callbacks.removeTask}>
        <Delete />
      </IconButton>
    </div>
  );
}

export default memo(TaskItem);
