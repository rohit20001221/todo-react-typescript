import { Todo } from "../interfaces/Todo";
import api from "./index";
import { _addTodo, _deleteTodo, _getTodos, _updateTodo } from "./todo";

it("should return empty array", async () => {
  jest.spyOn(api, "get").mockImplementation(async () => {
    return { data: [] };
  });

  const data = await _getTodos();
  expect(data).toEqual([]);
  expect(api.get).toBeCalledTimes(1);
});

it("should return list of todos", async () => {
  jest.spyOn(api, "get").mockImplementation(async () => {
    const todos: Todo[] = [
      {
        id: 1,
        title: "example todo",
        subtitle: "example subtitle",
        dateCreated: "12-21-2000",
        isCompleted: false,
      },
      {
        id: 2,
        title: "example todo 2",
        subtitle: "example subtitle 2",
        dateCreated: "12-21-2000",
        isCompleted: true,
      },
    ];
    return { data: todos };
  });

  const data = await _getTodos();
  expect(data).toEqual([
    {
      id: 1,
      title: "example todo",
      subtitle: "example subtitle",
      dateCreated: "12-21-2000",
      isCompleted: false,
    },
    {
      id: 2,
      title: "example todo 2",
      subtitle: "example subtitle 2",
      dateCreated: "12-21-2000",
      isCompleted: true,
    },
  ]);
  expect(api.get).toBeCalledTimes(1);
});

it("should successfully create a todo item", async () => {
  jest.spyOn(api, "post").mockImplementation(async (data) => {
    return { data };
  });

  const todo: Todo = {
    id: 2,
    title: "example todo 2",
    subtitle: "example subtitle 2",
    dateCreated: "12-21-2000",
    isCompleted: true,
  };
  await _addTodo(todo);
  expect(api.post).toBeCalledTimes(1);
  expect(api.post).toBeCalledWith("/v1/todo", JSON.stringify(todo));
});

it("should throw error while create a todo item", async () => {
  jest.spyOn(api, "post").mockImplementation(async (data) => {
    throw new Error("error creating todo");
  });

  const todo: Todo = {
    id: 2,
    title: "example todo 2",
    subtitle: "example subtitle 2",
    dateCreated: "12-21-2000",
    isCompleted: true,
  };

  expect(async () => {
    await _addTodo(todo);
  }).rejects;
});

it("should successfully update a todo item", async () => {
  jest.spyOn(api, "put").mockImplementation(async (data) => {
    return { data };
  });

  const todo: Todo = {
    id: 2,
    title: "example todo 2",
    subtitle: "example subtitle 2",
    dateCreated: "12-21-2000",
    isCompleted: true,
  };
  await _updateTodo("2", todo);
  expect(api.put).toBeCalledTimes(1);
  expect(api.put).toBeCalledWith("/v1/todo/2", JSON.stringify(todo));
});

it("should throw error while update a todo item", async () => {
  jest.spyOn(api, "put").mockImplementation(async (data) => {
    throw new Error("error updating todo");
  });

  const todo: Todo = {
    id: 2,
    title: "example todo 2",
    subtitle: "example subtitle 2",
    dateCreated: "12-21-2000",
    isCompleted: true,
  };

  expect(async () => {
    await _updateTodo("2", todo);
  }).rejects;
});

it("should successfully create a todo item", async () => {
  jest.spyOn(api, "delete").mockImplementation(async (url) => {
    const id = url.split("/")[url.split("/").length - 1];
    return { data: { [`id:${id}`]: "deleted" } };
  });

  const data = await _deleteTodo("2");
  expect(api.delete).toBeCalledTimes(1);
  expect(data).toEqual({ "id:2": "deleted" });
});

it("should throw error while delete a todo item", async () => {
  jest.spyOn(api, "delete").mockImplementation(async (data) => {
    throw new Error("error creating todo");
  });

  expect(async () => {
    await _deleteTodo("2");
  }).rejects;
});
