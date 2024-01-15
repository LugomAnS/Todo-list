import { ChangeEvent, useState, KeyboardEvent } from 'react';
import { Button } from '../button/Button';
import TasksList from './TasksList';
import { FilterType } from '../../App';

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean,
}

type TodoListPropsType = {
  title: string,
  tasks: TaskType[],
  remove: (value: string) => void,
  setFilter: (filter: FilterType) => void,
  addTask: (title: string) => void,
}

export function TodoList(props: TodoListPropsType) {
  const [taskTitle, setTaskTitle] = useState("");

  const callbacks = {
    onChangeTaskTitle: (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value),
    onKeyDownAddTask: (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && callbacks.onAddTask(),
    onAddTask: () => {
      props.addTask(taskTitle);
      setTaskTitle("");
    },
    onFilterChange: (filter: FilterType) => () => props.setFilter(filter),
  };

  return (
    <div className='todo-list'>
      <h3>{props.title}</h3>
      <div>
        <input
          value={taskTitle}
          onChange={ callbacks.onChangeTaskTitle }
          onKeyDown={ callbacks.onKeyDownAddTask }
        />
        <Button
          name='+'
          onClick={ callbacks.onAddTask}
          isDisabled={!taskTitle}
        />
      </div>
      <TasksList tasks={props.tasks} remove={props.remove} />
      <div>
        <Button name='All' onClick={callbacks.onFilterChange('all')}/>
        <Button name='Active' onClick={callbacks.onFilterChange('active')}/>
        <Button name='Completed' onClick={callbacks.onFilterChange('completed')}/>
      </div>
    </div>
  );
}


