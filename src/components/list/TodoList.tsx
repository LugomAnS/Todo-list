import React from 'react';
import { Button } from '../button/Button';
import TasksList from './TasksList';

export type TaskType = {
  id: number,
  title: string,
  isDone: boolean,
}

type TodoListPropsType = {
  title: string,
  tasks: TaskType[],
}

export function TodoList(props: TodoListPropsType) {
  return (
    <div className='todo-list'>
      <h3>{props.title}</h3>
      <div>
        <input />
        <Button name='+' />
      </div>
      <TasksList tasks={props.tasks} />
      <div>
        <Button name='All' />
        <Button name='Active' />
        <Button name='Completed' />
      </div>
    </div>
  );
}


