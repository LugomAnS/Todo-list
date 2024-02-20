import * as taskActions from './actions';

export type TasksActionsKeys = keyof typeof taskActions;

export type TaskReducerType = {
  [key in TasksActionsKeys]: ReturnType<typeof taskActions[key]>
}
