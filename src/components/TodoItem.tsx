import "../css/TodoItem.css";
import { motion, Variants } from "framer-motion";
import { Todo, TodoItemProps } from "../interfaces/Todo";
import { Paper, Typography, IconButton, Checkbox } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import { useTodo } from "../context/TodoContex";
import { useState } from "react";

function TodoItem(props: TodoItemProps) {
  const item: Todo = props.item;

  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, y: [10, 0] },
  };

  const [completed, setCompleted] = useState(item.isCompleted);

  const todo = useTodo();

  return (
    <motion.div initial="hidden" animate="visible" variants={variants}>
      <Paper className="todoItem">
        <div className="todoItem__body">
          <Typography id="todoitem-title" variant="h4">
            {item.title}
          </Typography>
          <Typography id="todoitem-subtitle">{item.subtitle}</Typography>
        </div>
        <div className="todoItem__meta">
          <strong>{item.dateCreated}</strong>
          {item.isCompleted ? (
            <CheckCircleIcon className="completedIcon" />
          ) : null}
          <IconButton onClick={() => todo.deleteItem(item.id)}>
            <DeleteIcon />
          </IconButton>
          <Checkbox
            checked={completed}
            onChange={(e) => {
              setCompleted(e.target.checked);
              todo.updateItem(item.id, {
                ...item,
                isCompleted: e.target.checked,
              });
            }}
          />
        </div>
      </Paper>
    </motion.div>
  );
}

export default TodoItem;
