import { memo, useState } from "react";
import TasksList from "../list/TasksList";
import { FilterType } from "../../App";
import AddItemForm from "../addItemForm/AddItemForm";
import EditableSpan from "../edatableSpan/editableSpan";
import IconButton from "@mui/material/IconButton";
import { Delete, ExpandLess, ExpandMore } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "../../state/store/store";
import * as taskAC from '../reducers/tasks/actions';
import * as todoListAc from '../reducers/todoLists/actions';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListPropsType = {
  id: string;
  title: string;
  filter: string;
};

function TodoListWithRedux(props: TodoListPropsType) {
  const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.id]);
  const tasksToShow =
    props.filter === "active"
      ? tasks.filter((item) => !item.isDone)
      : props.filter === "completed"
      ? tasks.filter((item) => item.isDone)
      : tasks;

  const [hide, setHide] = useState(false);

  const dispatch = useDispatch();

  const callbacks = {
    onAddTask: (value: string) => dispatch(taskAC.addTaskAC(props.id, value)),
    onFilterChange: (filter: FilterType) => () => dispatch(todoListAc.changeListFilterAC(props.id, filter)),
    onHideChange: () => setHide(!hide),
    onTaskRemove: (id: string) => dispatch(taskAC.removeTaskAC(props.id, id)),
    onChangeTaskStatus: (id: string, value: boolean) => dispatch(taskAC.changeStatusAC(props.id, id, value)),
    deleteList: () => {
      dispatch(todoListAc.deleteListAC(props.id))
    },
    changeTaskTitle: (taskId: string, newTitle: string) => dispatch(taskAC.changeTaskTitleAC(props.id, taskId, newTitle)),
    changeToDoListTitle: (newTitle: string) => dispatch(todoListAc.changeToDolistTitleAC(props.id, newTitle)),
  };

  return (
    <div style={{minWidth: "272px"}} className="todo-list">
      <h3 style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
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
            tasks={tasksToShow}
            remove={callbacks.onTaskRemove}
            changeTaskStatus={callbacks.onChangeTaskStatus}
            changeTaskTitle={callbacks.changeTaskTitle}
          />
          <div className="btn-block">
            <Button
              variant={props.filter === "all" ? "contained" : "outlined"}
              onClick={callbacks.onFilterChange("all")}
            >
              All
            </Button>
            <Button
              variant={props.filter === "active" ? "contained" : "outlined"}
              onClick={callbacks.onFilterChange("active")}
            >
              Active
            </Button>
            <Button
              variant={props.filter === "completed" ? "contained" : "outlined"}
              onClick={callbacks.onFilterChange("completed")}
            >
              Completed
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default memo(TodoListWithRedux);
