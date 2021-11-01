import api from "./index";

export const _getTodos = async () => {
  const { data } = await api.get("/v1/todo");
  return data;
};

export const _addTodo = async (body: any) => {
  const { data } = await api.post("/v1/todo", JSON.stringify(body));
  return data;
};

export const _deleteTodo = async (id: String) => {
  await api.delete(`/v1/todo/${id}`);
};

export const _updateTodo = async (id: String, data: any) => {
  await api.put(`/v1/todo/${id}`, JSON.stringify(data));
};
