import {  useState } from "react";
import TasksList from "../tasksList/TasksList";
import { FilterType } from "../../App";
import AddItemForm from "../addItemForm/AddItemForm";
import EditableSpan from "../edatableSpan/editableSpan";
import IconButton from "@mui/material/IconButton";
import { Delete, HideImage } from "@mui/icons-material";
import Button from "@mui/material/Button";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListPropsType = {
  id: string
  title: string;
  tasks: TaskType[];
  filter: string;
  remove: (listId: string, value: string) => void;
  setFilter: (id: string, filter: FilterType) => void;
  addTask: (listId: string, title: string) => void;
  changeTaskStatus: (listId: string, id: string, value: boolean) => void;
  delete: (listId: string) => void;
  changeTaskTitle: (listId: string, taskId: string, newTitle: string) => void;
  changeListTitle: (listId: string, newTitle: string) => void;
};

export function TodoList(props: TodoListPropsType) {

  const [hide, setHide] = useState(false);

  const callbacks = {
    onAddTask: (value: string) => props.addTask(props.id, value),
    onFilterChange: (filter: FilterType) => () => props.setFilter(props.id, filter),
    onHideChange: () => setHide(!hide),
    onTaskRemove: (id: string) => props.remove(props.id, id),
    onChangeTaskStatus: (id: string, value: boolean) => props.changeTaskStatus(props.id, id, value),
    deleteList: () => props.delete(props.id),
    changeTaskTitle: (taskId: string, newTitle: string) => props.changeTaskTitle(props.id, taskId, newTitle),
    changeToDoListTitle: (newTitle: string) => props.changeListTitle(props.id, newTitle),
  };

  return (
    <div className="todo-list">
      <h3>
        <EditableSpan title={props.title} onEdit={callbacks.changeToDoListTitle}/> &nbsp;
        <IconButton onClick={callbacks.onHideChange}>
          <HideImage/>
        </IconButton>
        <IconButton onClick={callbacks.deleteList}>
          <Delete />
        </IconButton>
      </h3>
      {!hide && (
        <>
          <AddItemForm onClick={callbacks.onAddTask} />
          {/* <TasksList
            listId={props.id}
            tasks={props.tasks}
            remove={callbacks.onTaskRemove}
            changeTaskStatus={callbacks.onChangeTaskStatus}
            changeTaskTitle={callbacks.changeTaskTitle}
          /> */}
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
