import { useReducer } from "react";
import "./App.css";
import { TodoList, TaskType } from "./components/list/TodoList";
import { v1 } from "uuid";
import AddItemForm from "./components/addItemForm/AddItemForm";
import Header from "./components/header/Header";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { taskReducer } from "./state/tasks/reducer";
import * as tasksAC from "./state/tasks/actions";
import * as listAC from "./state/todoLists/actions";
import { listReducer } from "./state/todoLists/reducer";

export type FilterType = "all" | "active" | "completed";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterType;
};

export type TaskStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
  const id1 = v1();
  const id2 = v1();

  const [todoLists, dispatchLists] = useReducer(listReducer, [
    { id: id1, title: "What to learn", filter: "all" },
    { id: id2, title: "What to buy", filter: "all" },
  ]);

  const [task, dispatchTasks] = useReducer(taskReducer, {
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

  const addToDoList = (title: string) => {
    const id = v1();
    dispatchLists(listAC.addToDoListAC(id, title));
    dispatchTasks(tasksAC.createEmptyTaskListAC(id));
  };

  const deleteList = (id: string) =>
    dispatchLists(listAC.deleteListAC(id));

  const changeListTitle = (id: string, value: string) =>
    dispatchLists(listAC.changeToDolistTitleAC(id, value));

  const changeListFilter = (id: string, filter: FilterType) =>
    dispatchLists(listAC.changeListFilterAC(id, filter));

  const removeTask = (listId: string, taskId: string) =>
    dispatchTasks(tasksAC.removeTaskAC(listId, taskId));

  const addTask = (todoListId: string, title: string) =>
    dispatchTasks(tasksAC.addTaskAC(todoListId, title));

  const changeTaskStatus = (listId: string, id: string, value: boolean) =>
    dispatchTasks(tasksAC.changeStatusAC(listId, id, value));

  const changeTaskTitle = (listId: string, id: string, value: string) =>
    dispatchTasks(tasksAC.changeTaskTitleAC(listId, id, value));

  return (
    <div className="App">
      <Header />
      <Container fixed>
        <Grid container style={{ marginTop: "20px", marginBottom: "20px" }}>
          <AddItemForm onClick={addToDoList} />
        </Grid>
        <Grid container spacing={2}>
          {todoLists.map((el) => {
            const taskToShow: Array<TaskType> =
              el.filter === "active"
                ? task[el.id].filter((item) => !item.isDone)
                : el.filter === "completed"
                ? task[el.id].filter((item) => item.isDone)
                : task[el.id];
            return (
              <Grid item>
                <Paper elevation={5} style={{ padding: "10px" }}>
                  <TodoList
                    key={el.id}
                    id={el.id}
                    title={el.title}
                    tasks={taskToShow}
                    remove={removeTask}
                    setFilter={changeListFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={el.filter}
                    delete={deleteList}
                    changeTaskTitle={changeTaskTitle}
                    changeListTitle={changeListTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
