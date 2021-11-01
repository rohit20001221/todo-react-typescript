import { ActionType } from "../interfaces/Context";
import { TodoCollectionType } from "../interfaces/Todo";

export const initialState: TodoCollectionType = {
  todos: [],
};

export const reducer = (
  state: TodoCollectionType,
  action: ActionType
): TodoCollectionType => {
  let todos;
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, todos: [...state.todos, action.payload] };
    case "LOAD_ITEMS":
      return { ...state, todos: action.payload };
    case "DELETE_ITEM":
      todos = state.todos.filter((item) => {
        return item.id !== action.payload;
      });
      return { ...state, todos };
    case "UPDATE_ITEM":
      todos = state.todos;

      for (let i = 0; i < todos.length; i++) {
        if (todos[i].id === action.payload.id) {
          todos[i] = action.payload;
          break;
        }
      }

      return { ...state, todos };
    default:
      return state;
  }
};
