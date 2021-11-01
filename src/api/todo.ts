import api from "./index";

export const _getTodos = async () => {
  const { data } = await api.get("/v1/todo");
  return data;
};

export const _addTodo = async (body: any) => {
  await api.post("/v1/todo", JSON.stringify(body));
};

export const _deleteTodo = async (id: Number) => {
  await api.delete(`/v1/todo/${id}`);
};
