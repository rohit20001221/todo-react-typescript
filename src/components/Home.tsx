import "../css/Home.css";
import { Key, useEffect, useRef } from "react";
import { Todo } from "../interfaces/Todo";
import TodoItem from "./TodoItem";
import AddForm from "./AddForm";
import { useStore } from "../context/StoreContex";
import api from "../api";

function Home() {
  const [{ todos }, dispatch] = useStore();
  const itemdiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemdiv.current !== null) {
      itemdiv.current.scrollTop = itemdiv.current?.scrollHeight || 0;
    }
  }, [todos]);

  useEffect(() => {
    api.get("/v1/todo").then((results) => {
      dispatch({
        type: "LOAD_ITEMS",
        payload: results.data,
      });
    });
  }, [dispatch]);

  return (
    <div className="home">
      <div ref={itemdiv} className="home__todoItems">
        {todos.map((item: Todo, idx: Key) => {
          return <TodoItem item={item} key={idx} />;
        })}
      </div>
      <AddForm className="home__todoForm" />
    </div>
  );
}

export default Home;
