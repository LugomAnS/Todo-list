import { ChangeEvent, KeyboardEvent, memo, useState } from "react";
import { Button } from "../button/Button";

type AddItemFormPropsType = {
  onClick: (value: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState("");

  const callbacks = {
    onChangeTaskTitle: (e: ChangeEvent<HTMLInputElement>) => {
      error && setError("");
      setTaskTitle(e.currentTarget.value);
    },
    onAddTask: () => {
      const trimmedTitle = taskTitle.trim();

      if (!trimmedTitle) {
        setTaskTitle("");
        setError("Некорректное название");
        return;
      }
      props.onClick(trimmedTitle);
      setTaskTitle("");
    },
    onKeyDownAddTask: (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && callbacks.onAddTask(),
  }

  return (
    <div>
      <input
        className={error ? "task-input-error" : ""}
        value={taskTitle}
        onChange={callbacks.onChangeTaskTitle}
        onKeyDown={callbacks.onKeyDownAddTask}
      />
      <Button name="+" onClick={callbacks.onAddTask} isDisabled={!taskTitle} />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

export default memo(AddItemForm);
