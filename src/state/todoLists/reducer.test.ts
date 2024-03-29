import { v1 } from "uuid";
import { FilterType, TodoListType } from "../../App";
import { listReducer } from "./reducer";
import * as actions from "./actions";

let todolistId1: string;
let todolistId2: string;

let startState: Array<TodoListType>;

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();

  startState = [
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ];
});
/**
 * Тест на проверку удаления тудулиста
 */
test("correct todolist should be removed", () => {
  const endState = listReducer(startState, actions.deleteListAC(todolistId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

/**
 * Тест на добавление тудулиста
 */
test("correct todolist should be added", () => {
  let newTodolistTitle = "New Todolist";

  const endState = listReducer(
    startState,
    actions.addToDoListAC(v1(), newTodolistTitle)
  );

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
});

/**
 * Тест для смены названия тудулиста
 */
test("correct todolist should change its name", () => {
  let newTodolistTitle = "New Todolist";

  const endState = listReducer(
    startState,
    actions.changeToDolistTitleAC(todolistId2, newTodolistTitle)
  );

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

/**
 * Тест для фильтрации тасок в тудулисте
 */
test("correct filter of todolist should be changed", () => {
  let newFilter: FilterType = "completed";

  const endState = listReducer(
    startState,
    actions.changeListFilterAC(todolistId2, newFilter)
  );

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});

test("ids should be equals", () => {
  const startTodolistsState: Array<TodoListType> = [];

  let id = v1();

  const action = actions.addToDoListAC(id, "new todolist");

  const endTodolistsState = listReducer(startTodolistsState, action);

  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTodolists).toBe(id);
});
