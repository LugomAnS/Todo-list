import React from 'react';
import { Button } from './Button';

export type TaskType = {
  id: number,
  title: string,
  isDone: boolean,
}

type TodoListPropsType = {
  title: string,
  tasks?: TaskType[],
}

export function TodoList(props: TodoListPropsType) {
  return (
    <div className='todo-list'>
      <h3>{props.title}</h3>
      <div>
        <input />
        <Button name='+' />
      </div>
      <ul>
        {props.tasks?.map(item => (
          <li key={item.id} ><input type="checkbox" checked={item.isDone} /> <span>{item.title}</span></li>
        ))}
      </ul>
      <div>
        <Button name='All' />
        <Button name='Active' />
        <Button name='Completed' />
      </div>
    </div>
  );
}


