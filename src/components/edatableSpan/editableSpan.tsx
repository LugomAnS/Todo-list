import { ChangeEvent, memo, useState, KeyboardEvent } from "react";

type EditableSpanPropsType = {
  onEdit: (value: string) => void;
  title: string;
};

function EditableSpan(props: EditableSpanPropsType) {
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(props.title);
  const [error, setError] = useState("");

  const callbacks = {
    onEditChange: () => {
      setEdit(!edit)
      setError('');
      setNewTitle(props.title);
    },
    onChangeValue: (e: ChangeEvent<HTMLInputElement>) => {
      setError("");
      setNewTitle(e.currentTarget.value);
    },
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        const trimmed = newTitle.trim();
        if (trimmed) {
          props.onEdit(trimmed);
          callbacks.onEditChange();
          return;
        }
        setError("Invalid value");
      }
      if (e.key === "Escape") {
        callbacks.onEditChange();
        return;
      }
    },
  };

  return edit ? (
    <>
      <input
        autoFocus
        value={newTitle}
        onBlur={callbacks.onEditChange}
        onChange={callbacks.onChangeValue}
        onKeyDown={callbacks.onKeyDown}
      />
      {error && <div>{error}</div>}
    </>
  ) : (
       <span onDoubleClick={callbacks.onEditChange}>{props.title}</span>
  );
}

export default memo(EditableSpan);
