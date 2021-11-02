import { useMutation, useQuery } from "react-query";
import { Todo } from "../interfaces/Todo";
import api, { queryClient } from "./index";

export const _getTodos = async () => {
  const { data } = await api.get("/v1/todo");
  return data;
};

export const _addTodo = async (body: any) => {
  const { data } = await api.post("/v1/todo", JSON.stringify(body));
  return data;
};

export const _deleteTodo = async (id: String) => {
  const { data } = await api.delete(`/v1/todo/${id}`);
  return data;
};

export const _updateTodo = async (id: String, update: any) => {
  const { data } = await api.put(`/v1/todo/${id}`, JSON.stringify(update));
  return data;
};

export const useGetTodos = () => useQuery("get-todo", _getTodos);
export const useAddTodo = () =>
  useMutation((newTodo: Todo) => _addTodo(newTodo), {
    onSuccess: () => queryClient.invalidateQueries("get-todo"),
  });

export const useUpdateTodo = () =>
  useMutation((todo: Todo) => _updateTodo(String(todo.id), todo), {
    onSuccess: () => queryClient.invalidateQueries("get-todo"),
  });

export const useDeleteTodo = () =>
  useMutation((id: any) => _deleteTodo(id), {
    onSuccess: () => queryClient.invalidateQueries("get-todo"),
  });
