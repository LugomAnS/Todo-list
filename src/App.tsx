import React from 'react';
import './App.css';
import { TodoList, TaskType } from './components/list/TodoList';

function App() {
  const task1: TaskType[] = [
    { id: 1, title: "HTML&CSS", isDone: false },
    { id: 2, title: "JS", isDone: false },
    { id: 3, title: "TS", isDone: true }
  ]

  return (
    <div className="App">
      <TodoList title='What to learn' tasks={task1} />
      <TodoList title='What to learn' tasks={[]} />
    </div>
  );
}

export default App;
