import { FilterType } from "../../App";

export const filterReducer = (state: FilterType, action: FilterReducerType): FilterType => {
  switch (action.type) {
    case 'CHANGE-FILTER':
      return action.payload.filter
    default:
      return state;
  }

}

type FilterReducerType = ReturnType<typeof filterChangeAC>;

export const filterChangeAC = (filter: FilterType) => {
  return {
    type: "CHANGE-FILTER",
    payload: {
      filter
    }
  } as const
}
