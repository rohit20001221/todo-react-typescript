import { ActionType } from "../interfaces/Context";
import { Todo, TodoCollectionType } from "../interfaces/Todo";

export const initialState: TodoCollectionType = {
  todos: [],
};

export const reducer = (
  state: TodoCollectionType,
  action: ActionType
): TodoCollectionType => {
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, todos: [...state.todos, action.payload] };
    case "LOAD_ITEMS":
      return { ...state, todos: action.payload };
    default:
      return state;
  }
};
