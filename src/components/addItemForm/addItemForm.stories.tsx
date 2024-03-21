import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import AddItemForm, { AddItemFormPropsType } from './AddItemForm';
import { ChangeEvent, memo, useState, KeyboardEvent } from 'react';
import TextField from '@mui/material/TextField/TextField';
import Button from '@mui/material/Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof AddItemForm> = {
  title: 'ToDoList/AddItemForm',
  component: AddItemForm,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    onClick: {
      description: "Button clicked inside form",
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    onClick: fn()
  },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const AddItemFormStory: Story = {};

const AddItemFormError = memo((props: AddItemFormPropsType) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [error, setError] = useState("Некорректное название");

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
})


export const AddItemFormStoryError: Story = {
  render: () => <AddItemFormError onClick={() => {}} />
}