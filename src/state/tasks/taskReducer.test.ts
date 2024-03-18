import { TaskStateType } from "../../App";
import * as taskAC from "./actions";
import * as todoAC from "../todoLists/actions";
import { taskReducer } from "./reducer";
import { v1 } from "uuid";

let startState: TaskStateType;

beforeEach(() => {
  startState = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "2", title: "milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };
})

test("correct task should be deleted from correct array", () => {

  const action = taskAC.removeTaskAC("todolistId2", "2");

  const endState = taskReducer(startState, action);

  expect(endState).toEqual({
    todolistId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "bread", isDone: false },
      { id: "3", title: "tea", isDone: false },
    ],
  });
});

test("correct task should be added to correct array", () => {
  const action = taskAC.addTaskAC("todolistId2", "juce");

  const endState = taskReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("bread");
  expect(endState["todolistId2"][0].isDone).toBe(false);
});

test("status of specified task should be changed", () => {

  const action = taskAC.changeStatusAC("todolistId2", "2", false);

  const endState = taskReducer(startState, action);

  expect(endState["todolistId1"][1].isDone).toBe(true);
  expect(endState["todolistId2"][1].isDone).toBe(false);
});

test("title of specified task should be changed", () => {

  const action = taskAC.changeTaskTitleAC("todolistId2", "3", "coffee");

  const endState = taskReducer(startState, action);

  expect(endState["todolistId1"][1].title).toBe("JS");
  expect(endState["todolistId2"][2].title).toBe("coffee");
});

test('new array should be added when new todolist is added', () => {

  let id = v1();
  const action2 = taskAC.createEmptyTaskListAC(id);

  const endState =  taskReducer(startState, action2)


  const keys = Object.keys(endState);
  const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
  if (!newKey) {
      throw Error("new key should be added")
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test('array should be deleted', () => {

  const action = todoAC.deleteListAC("todolistId2");

  const endState =  taskReducer(startState, action)

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"]).not.toBeDefined();
});
