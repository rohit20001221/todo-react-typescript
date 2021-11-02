import "../css/Home.css";
import { Key, useEffect, useRef } from "react";
import { Todo } from "../interfaces/Todo";
import TodoItem from "./TodoItem";
import AddForm from "./AddForm";
import { useGetTodos } from "../api/todo";

function Home() {
  const { data, isLoading } = useGetTodos();

  const itemdiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemdiv.current !== null) {
      itemdiv.current.scrollTop = itemdiv.current?.scrollHeight || 0;
    }
  }, [data]);

  if (isLoading) {
    return <div>loading ....</div>;
  }

  return (
    <div className="home">
      <div ref={itemdiv} className="home__todoItems">
        {data.map((item: Todo, idx: Key) => {
          return <TodoItem item={item} key={idx} />;
        })}
      </div>
      <AddForm className="home__todoForm" />
    </div>
  );
}

export default Home;
