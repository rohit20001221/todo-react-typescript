import "../css/TodoItem.css";
import { motion, Variants } from "framer-motion";
import { Todo, TodoItemProps } from "../interfaces/Todo";
import { Paper, Typography, IconButton, Checkbox } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import { useTodo } from "../context/TodoContex";
import { useState } from "react";
import { Formik, Field, Form } from "formik";
import { useDeleteTodo, useUpdateTodo } from "../api/todo";

function TodoItem(props: TodoItemProps) {
  const item: Todo = props.item;

  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, y: [10, 0] },
  };

  const [completed, setCompleted] = useState(item.isCompleted);
  const [editMode, setEditMode] = useState(false);

  const todo = useTodo();

  const updateMutate = useUpdateTodo();
  const deleteMutate = useDeleteTodo();

  if (!editMode) {
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
            <IconButton onClick={() => deleteMutate.mutate(item.id)}>
              <DeleteIcon />
            </IconButton>
            <Checkbox
              checked={completed}
              onChange={(e) => {
                updateMutate.mutate({
                  ...item,
                  isCompleted: e.target.checked,
                });

                setCompleted(e.target.checked);
              }}
            />
            <IconButton
              onClick={() => {
                setEditMode((val) => !val);
              }}
            >
              <CreateIcon />
            </IconButton>
          </div>
        </Paper>
      </motion.div>
    );
  }

  return (
    <Formik
      initialValues={{
        ...item,
      }}
      onSubmit={(values) => {
        todo.updateItem(item.id, values);
        setCompleted(values.isCompleted);
        setEditMode((val) => !val);
      }}
    >
      {() => {
        return (
          <Paper className="todoItem">
            <div className="todoItem__body">
              <Form>
                <Field name="title" />
                <Field name="subtitle" />
                <Field name="isCompleted" type="checkbox" />
                <Field name="dateCreated" type="date" />

                <button type="submit">update</button>
              </Form>
            </div>
            <div className="todoItem__meta">
              <IconButton
                onClick={() => {
                  setEditMode((val) => !val);
                }}
              >
                <CreateIcon />
              </IconButton>
            </div>
          </Paper>
        );
      }}
    </Formik>
  );
}

export default TodoItem;
