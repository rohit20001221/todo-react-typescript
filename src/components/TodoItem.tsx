import "../css/TodoItem.css";
import { motion, Variants } from "framer-motion";
import { Todo, TodoItemProps } from "../interfaces/Todo";
import { Paper, Typography } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

function TodoItem(props: TodoItemProps) {
  const item: Todo = props.item;

  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, y: [10, 0] },
  };

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
        </div>
      </Paper>
    </motion.div>
  );
}

export default TodoItem;
