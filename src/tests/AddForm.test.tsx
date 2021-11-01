import "@testing-library/react";
import api from "../api";
import { Todo } from "../interfaces/Todo";

it("test for the get api", async () => {
  const result = await api.get("/v1/todo");
  expect(result.status).toEqual(200);
  expect(result.data).toBeInstanceOf(Array);
});

it("test for create reterive update and delete api", async () => {
  //   create api testing
  const data: Todo = {
    title: "testing title",
    subtitle: "testing subtitle",
    dateCreated: "2021-12-21",
    isCompleted: true,
    id: null,
  };
  const result = await api.post("/v1/todo", data);
  expect(result.status).toEqual(200);

  const id = result.data.id;

  //   fetch a particular todo
  const restodo = await api.get(`v1/todo/${id}`);
  expect(restodo.status).toEqual(200);

  data.id = id;
  //   check wether the correct todo is been reterived
  expect(data).toEqual(restodo.data);

  //   fetch for the wrong id
  //   expect(await api.get(`v1/todo/${id + 10}`)).toThrowError();

  //   try to update the todo
  data.isCompleted = false;

  const uptodo = await api.put(`v1/todo/${id}`, data);
  expect(uptodo.status).toEqual(200);
  expect(uptodo.data.isCompleted).toEqual(false);

  //   try deleting the object
  const deltodo = await api.delete(`v1/todo/${id}`);
  expect(deltodo.status).toEqual(200);
  expect(deltodo.data).toHaveProperty(`id:${id}`);
  expect(deltodo.data[`id:${id}`]).toEqual("deleted");
});
