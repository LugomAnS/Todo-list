import React, { useState } from 'react';
import './App.css';
import { TodoList, TaskType } from './components/list/TodoList';
import { v1 } from 'uuid';

export type FilterType = 'all' | 'active' | 'completed';

function App() {

  const [task, setTask] = useState<Array<TaskType>>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "TS", isDone: false },
    { id: v1(), title: "REACT", isDone: false }
  ]);

  const [filter, setFilter] = useState<FilterType>('all');

  const removeTask = (id: string) => {
    setTask(task.filter(item => item.id !== id));
  }

  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false
    };

    setTask([newTask, ...task]);
  }

  const taskToShow: Array<TaskType> = filter === 'active'
    ? task.filter(item => !item.isDone)
    : filter === 'completed'
      ? task.filter(item => item.isDone)
      : task;

  return (
    <div className="App">
      <TodoList title='What to learn' tasks={taskToShow} remove={removeTask} setFilter={setFilter} addTask={addTask}/>
     {/*  <TodoList title='What to learn' tasks={[]} remove={() => {}} setFilter={() => {}} addTask={() => {}} /> */}
    </div>
  );
}

export default App;
