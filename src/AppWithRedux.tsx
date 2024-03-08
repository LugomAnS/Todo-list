import "./App.css";
import { TaskType } from "./components/list/TodoList";
import { v1 } from "uuid";
import AddItemForm from "./components/addItemForm/AddItemForm";
import Header from "./components/header/Header";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as tasksAC from "./components/reducers/tasks/actions";
import * as listAC from "./components/reducers/todoLists/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store/store";
import TodoListWithRedux from "./components/todoListWithRedux/TodoListWithRedux";

export type FilterType = "all" | "active" | "completed";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterType;
};

export type TaskStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithRedux() {

  const todoLists = useSelector<AppRootStateType, TodoListType[]>(
    (state) => state.todolists
  );

  const dispatch = useDispatch();

  const addToDoList = (title: string) => {
    const id = v1();
    dispatch(listAC.addToDoListAC(id, title));
    dispatch(tasksAC.createEmptyTaskListAC(id));
  };

  return (
    <div className="App">
      <Header />
      <Container fixed>
        <Grid container style={{ marginTop: "20px", marginBottom: "20px" }}>
          <AddItemForm onClick={addToDoList} />
        </Grid>
        <Grid container spacing={2}>
          {todoLists.map((el) => {
            return (
              <Grid item key={el.id}>
                <Paper elevation={5} style={{ padding: "10px" }}>
                  <TodoListWithRedux
                    id={el.id}
                    title={el.title}
                    filter={el.filter}
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

export default AppWithRedux;
