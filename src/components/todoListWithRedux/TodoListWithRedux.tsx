import { memo, useCallback, useState } from "react";
import TasksList from "../tasksList/TasksList";
import { FilterType } from "../../App";
import AddItemForm from "../addItemForm/AddItemForm";
import EditableSpan from "../edatableSpan/editableSpan";
import IconButton from "@mui/material/IconButton";
import { Delete, ExpandLess, ExpandMore } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store/store";
import * as taskAC from "../../state/tasks/actions";
import * as todoListAc from "../../state/todoLists/actions";
import MuiMemoButton from "../muiMemoButton/muiMemoButton";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListPropsType = {
  id: string;
  title: string;
  filter: FilterType;
};

function TodoListWithRedux(props: TodoListPropsType) {
  const tasks = useSelector<AppRootStateType, TaskType[]>(
    (state) => state.tasks[props.id]
  );
  const tasksToShow =
    props.filter === "active"
      ? tasks.filter((item) => !item.isDone)
      : props.filter === "completed"
      ? tasks.filter((item) => item.isDone)
      : tasks;

  const [hide, setHide] = useState(false);

  const dispatch = useDispatch();

  const callbacks = {
    onAddTask: useCallback((value: string) => dispatch(taskAC.addTaskAC(props.id, value)), [dispatch, props.id]),
    onFilterChange: useCallback((filter: FilterType) => () =>
      dispatch(todoListAc.changeListFilterAC(props.id, filter)), [dispatch, props.id]),
    onHideChange: useCallback(() => setHide(!hide), [hide]),
    onTaskRemove: useCallback((id: string) => dispatch(taskAC.removeTaskAC(props.id, id)), [props.id, dispatch]),
    onChangeTaskStatus: useCallback((id: string, value: boolean) =>
      dispatch(taskAC.changeStatusAC(props.id, id, value)), [dispatch, props.id]),
    deleteList: useCallback(() => dispatch(todoListAc.deleteListAC(props.id)), [dispatch, props.id]),
    changeTaskTitle: useCallback((taskId: string, newTitle: string) =>
      dispatch(taskAC.changeTaskTitleAC(props.id, taskId, newTitle)), [dispatch, props.id]),
    changeToDoListTitle: useCallback((newTitle: string) =>
      dispatch(todoListAc.changeToDolistTitleAC(props.id, newTitle)),[dispatch, props.id]),
  };

  return (
    <div style={{ minWidth: "272px" }} className="todo-list">
      <h3
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <EditableSpan
          title={props.title}
          onEdit={callbacks.changeToDoListTitle}
        />{" "}
        <div>
          <IconButton onClick={callbacks.onHideChange}>
            {hide ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
          <IconButton onClick={callbacks.deleteList}>
            <Delete />
          </IconButton>
        </div>
      </h3>
      {!hide && (
        <>
          <AddItemForm onClick={callbacks.onAddTask} />
          <TasksList
            listId={props.id}
            tasks={tasksToShow}
          />
          <div className="btn-block">
            <MuiMemoButton
              title="All"
              variant={props.filter === "all" ? "contained" : "outlined"}
              onClick={callbacks.onFilterChange("all")}
            />
            <MuiMemoButton
              title="Active"
              variant={props.filter === "active" ? "contained" : "outlined"}
              onClick={callbacks.onFilterChange("active")}
            />
            <MuiMemoButton
              title="Completed"
              variant={props.filter === "completed" ? "contained" : "outlined"}
              onClick={callbacks.onFilterChange("completed")}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default memo(TodoListWithRedux);
