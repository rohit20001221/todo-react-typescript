import { createContext, PropsWithChildren, useEffect, useContext } from "react";
import { _addTodo, _deleteTodo, _getTodos, _updateTodo } from "../api/todo";
import { Todo } from "../interfaces/Todo";
import { useStore } from "./StoreContex";

const TodoContext = createContext<any>(null);

export const TodoProvider = ({ children }: PropsWithChildren<any>) => {
  const [, dispatch] = useStore();

  const addItem = (payload: Todo) => {
    _addTodo(payload).then((todo) => {
      dispatch({
        type: "ADD_ITEM",
        payload: todo,
      });
    });
  };

  const deleteItem = async (id: String) => {
    await _deleteTodo(id);
    dispatch({
      type: "DELETE_ITEM",
      payload: id,
    });
  };

  const updateItem = async (id: String, payload: any) => {
    await _updateTodo(id, payload);
  };

  useEffect(() => {
    _getTodos().then((result) => {
      dispatch({
        type: "LOAD_ITEMS",
        payload: result,
      });
    });
  }, []);

  return (
    <TodoContext.Provider value={{ addItem, deleteItem, updateItem }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);
