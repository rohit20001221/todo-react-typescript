import "../css/AddItem.css";
import { Todo } from "../interfaces/Todo";
import { Formik, Form, ErrorMessage } from "formik";
import InputField from "./InputField";
import { PropsWithoutRef } from "react";
import { Button } from "@material-ui/core";
import { useAddTodo } from "../api/todo";

function AddForm(props: PropsWithoutRef<any>) {
  const mutation = useAddTodo();
  const onSubmit = (values: Todo, { resetForm }: any) => {
    console.log(values);

    mutation.mutate(values);
    resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          subtitle: "",
          dateCreated: "",
          isCompleted: false,
          id: 0,
        }}
        onSubmit={onSubmit}
        enableReinitialize={true}
        validate={(values) => {
          let errors: any = {};

          if (!values.title) {
            errors.title = "required title";
          }

          if (!values.subtitle) {
            errors.subtitle = "required sub title";
          }

          if (!values.dateCreated) {
            errors.dateCreated = "required date created";
          }

          return errors;
        }}
      >
        {() => {
          return (
            <Form {...props}>
              <InputField
                id="title-input"
                name="title"
                label="title"
                type="text"
              />
              <div className="errorMessage">
                <ErrorMessage name="title" />
              </div>

              <InputField
                id="subtitle-input"
                name="subtitle"
                label="subtitle"
                type="text"
              />
              <div className="errorMessage">
                <ErrorMessage name="subtitle" />
              </div>
              <InputField
                id="dateCreated-input"
                name="dateCreated"
                type="date"
              />
              <div className="errorMessage">
                <ErrorMessage name="dateCreated" />
              </div>

              <Button
                data-testid="submit-btn"
                type="submit"
                variant="contained"
                color="secondary"
                id="submit-btn"
              >
                Add
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default AddForm;
