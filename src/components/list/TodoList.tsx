import { ChangeEvent, useState, KeyboardEvent } from "react";
import { Button } from "../button/Button";
import TasksList from "./TasksList";
import { FilterType } from "../../App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListPropsType = {
  title: string;
  tasks: TaskType[];
  filter: string;
  remove: (value: string) => void;
  setFilter: (filter: FilterType) => void;
  addTask: (title: string) => void;
  changeTaskStatus: (id: string, value: boolean) => void;
};

export function TodoList(props: TodoListPropsType) {
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState("");
  const [hide, setHide] = useState(false);

  const callbacks = {
    onChangeTaskTitle: (e: ChangeEvent<HTMLInputElement>) => {
      error && setError("");
      setTaskTitle(e.currentTarget.value);
    },
    onKeyDownAddTask: (e: KeyboardEvent<HTMLInputElement>) =>
      e.key === "Enter" && callbacks.onAddTask(),
    onAddTask: () => {
      const trimmedTitle = taskTitle.trim();

      if (!trimmedTitle) {
        setTaskTitle("");
        setError("Некорректное название");
        return;
      }
      props.addTask(trimmedTitle);
      setTaskTitle("");
    },
    onFilterChange: (filter: FilterType) => () => props.setFilter(filter),
    onHideChange: () => setHide(!hide),
  };

  return (
    <div className="todo-list">
      <h3>
        {props.title} &nbsp;
        <Button name="+" onClick={callbacks.onHideChange} />
      </h3>
      {!hide && (
        <>
          <div>
            <input
              className={error ? "task-input-error" : ""}
              value={taskTitle}
              onChange={callbacks.onChangeTaskTitle}
              onKeyDown={callbacks.onKeyDownAddTask}
            />
            <Button
              name="+"
              onClick={callbacks.onAddTask}
              isDisabled={!taskTitle}
            />
            {error && <div style={{ color: "red" }}>{error}</div>}
          </div>
          <TasksList
            tasks={props.tasks}
            remove={props.remove}
            changeTaskStatus={props.changeTaskStatus}
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
