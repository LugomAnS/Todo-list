import React, { useState } from "react";
import "./App.css";
import { TodoList, TaskType } from "./components/list/TodoList";
import { v1 } from "uuid";
import AddItemForm from "./components/addItemForm/AddItemForm";

export type FilterType = "all" | "active" | "completed";

type TodoListType = {
  id: string;
  title: string;
  filter: FilterType;
};

type TaskStateType ={
  [key: string]: Array<TaskType>
}

function App() {
  const id1 = v1();
  const id2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: id1, title: "What to learn", filter: "all" },
    { id: id2, title: "What to buy", filter: "all" },
  ]);

  const [task, setTask] = useState<TaskStateType>({
    [id1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "TS", isDone: false },
      { id: v1(), title: "REACT", isDone: false },
    ],
    [id2]: [
      { id: v1(), title: "Meat", isDone: true },
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Bread", isDone: false },
      { id: v1(), title: "Tea", isDone: false },
    ],
  });

  const changeFilter = (id: string, value: FilterType) => {
    setTodoLists(
      todoLists.map((el) => (el.id === id ? { ...el, filter: value } : el))
    );
  };

  const removeTask = (todoListId: string, taskId: string) => {
    setTask({...task, [todoListId]: task[todoListId].filter(el => el.id !== taskId)});
  };

  const addTask = (todoListId: string, title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false,
    };

    setTask({...task, [todoListId]: [...task[todoListId], newTask] });
  };

  const changeTaskStatus = (listId: string, id: string, value: boolean) => {
    setTask({...task, [listId]: [...task[listId].map(el => el.id === id ? {...el, isDone: value} : el)]})
  };

  const deleteList = (listId: string) => {
    setTodoLists(todoLists.filter(el => el.id !== listId));
    delete task[listId];
  }

  const addToDoList = (title: string) => {
    const newToDoList: TodoListType = {
      id: v1(),
      title,
      filter: 'all'
    }

    setTodoLists([...todoLists, newToDoList]);
    setTask({...task, [newToDoList.id]: []})
  }

  const changeTaskTitle = (listId: string, taskId: string, newTitle: string) => {
    setTask({...task, [listId]: [...task[listId].map(el => el.id === taskId ? {...el, title: newTitle}: el)]})
  }

  const changeTodoListTitle = (listId: string, newValue: string) => {
    setTodoLists([...todoLists.map(el => el.id === listId ? {...el, title: newValue} : el)])
  }

  return (
    <div className="App">
      <AddItemForm onClick={addToDoList} />
      {todoLists.map((el) => {
        const taskToShow: Array<TaskType> =
          el.filter === "active"
            ? task[el.id].filter((item) => !item.isDone)
            : el.filter === "completed"
            ? task[el.id].filter((item) => item.isDone)
            : task[el.id];
        return (
          <TodoList
            key={el.id}
            id={el.id}
            title={el.title}
            tasks={taskToShow}
            remove={removeTask}
            setFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={el.filter}
            delete={deleteList}
            changeTaskTitle={changeTaskTitle}
            changeListTitle={changeTodoListTitle}
          />
        );
      })}

      {/*  <TodoList title='What to learn' tasks={[]} remove={() => {}} setFilter={() => {}} addTask={() => {}} /> */}
    </div>
  );
}

export default App;
