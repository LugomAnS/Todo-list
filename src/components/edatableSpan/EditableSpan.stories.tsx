import type { Meta, StoryObj } from '@storybook/react';

import EditableSpan, { EditableSpanPropsType } from './editableSpan';
import { fn } from '@storybook/test';
import { ChangeEvent, useState, KeyboardEvent } from 'react';



// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof EditableSpan> = {
  title: 'ToDoList/EditableSpan',
  component: EditableSpan,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {

  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    onEdit: fn(),
    title: "Some text",
  },
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const EditableSpanStory: Story = {}

const EditableSpanFormEdit = (props: EditableSpanPropsType) => {
  const [edit, setEdit] = useState<true>(true);
  const [newTitle, setNewTitle] = useState(props.title);
  const [error, setError] = useState("");

  const callbacks = {
    onEditChange: () => {
      setEdit(true)
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

export const EditableSpanStoryEditMode = {
  render: () => <EditableSpanFormEdit onEdit={fn} title='Editing...' />
}

