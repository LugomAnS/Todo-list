import {  useState } from "react";
import { Button } from "../button/Button";
import TasksList from "./TasksList";
import { FilterType } from "../../App";
import AddItemForm from "../addItemForm/AddItemForm";
import EditableSpan from "../edatableSpan/editableSpan";

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
        <Button name="+" onClick={callbacks.onHideChange} />
        <Button name="X" onClick={callbacks.deleteList}/>
      </h3>
      {!hide && (
        <>
          <AddItemForm onClick={callbacks.onAddTask} />
          <TasksList
            tasks={props.tasks}
            remove={callbacks.onTaskRemove}
            changeTaskStatus={callbacks.onChangeTaskStatus}
            changeTaskTitle={callbacks.changeTaskTitle}
          />
          <div className="btn-block">
            <Button
              classes={props.filter === "all" ? "btn-active" : "btn"}
              name="All"
              onClick={callbacks.onFilterChange("all")}
            />
            <Button
              classes={props.filter === "active" ? "btn-active" : "btn"}
              name="Active"
              onClick={callbacks.onFilterChange("active")}
            />
            <Button
              classes={props.filter === "completed" ? "btn-active" : "btn"}
              name="Completed"
              onClick={callbacks.onFilterChange("completed")}
            />
          </div>
        </>
      )}
    </div>
  );
}
