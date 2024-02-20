import * as listActions from './actions';

type ActionsType = typeof listActions;
export type ListActionsKeys = keyof ActionsType;

export type ListReducerType = {
  [key in ListActionsKeys]: ReturnType<typeof listActions[key]>
}