import { Delete } from "@mui/icons-material";
import EditableSpan from "../edatableSpan/editableSpan";
import { IconButton } from "@mui/material";
import CheckBox from "@mui/material/Checkbox";
import { TaskType } from "../todoListWithRedux/TodoListWithRedux";
import { useDispatch } from "react-redux";
import { ChangeEvent, memo } from "react";
import * as taskAc from "../../state/tasks/actions";
import s from './styles.module.css';

type TaskItemPropspType = {
  listId: string;
  item: TaskType;
};

function TaskItem({ listId, item }: TaskItemPropspType) {
  const dispatch = useDispatch();

  const callbacks = {
    changeTaskStatus: (e: ChangeEvent<HTMLInputElement>) =>
      dispatch(taskAc.changeStatusAC(listId, item.id, e.currentTarget.checked)),
    changeTaskTitle: (value: string) =>
      dispatch(taskAc.changeTaskTitleAC(listId, item.id, value)),
    removeTask: () => dispatch(taskAc.removeTaskAC(listId, item.id)),
  };

  return (
    <div key={item.id} className={item.isDone ? s.TaskDone : s.Task}>
      <CheckBox checked={item.isDone} onChange={callbacks.changeTaskStatus} />
      <EditableSpan title={item.title} onEdit={callbacks.changeTaskTitle} />
      &nbsp;
      <IconButton onClick={callbacks.removeTask}>
        <Delete />
      </IconButton>
    </div>
  );
}

export default memo(TaskItem);
