import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ChangeEvent, KeyboardEvent, memo, useState } from "react";

type AddItemFormPropsType = {
  onClick: (value: string) => void;
};

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
  };

  const styles = {
    maxWidth: "40px",
    maxHeight: "40px",
    minWidth: "40px",
    minHeight: "40px",
  };

  return (
    <div>
      <TextField id="outlined-basic"
               className={error ? "task-input-error" : ""}
               value={taskTitle}
               onChange={callbacks.onChangeTaskTitle}
               onKeyDown={callbacks.onKeyDownAddTask}
               size="small"
               placeholder="Введите значение"
               label={error ? error : "Введите значение"}
               error={!!error}
      />
      <Button
        sx={styles}
        variant="contained"
        onClick={callbacks.onAddTask}
        disabled={!taskTitle}
        size="small"
      >
        +
      </Button>
    </div>
  );
}

export default memo(AddItemForm);
