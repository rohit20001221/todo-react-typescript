import { useStore } from "../context/StoreContex";
import "../css/AddItem.css";
import { Todo } from "../interfaces/Todo";

import { Formik, Form, Field, ErrorMessage } from "formik";
import InputField from "./InputField";
import { PropsWithoutRef } from "react";
import { Button } from "@material-ui/core";
import api from "../api";

function AddForm(props: PropsWithoutRef<any>) {
  const [, dispatch] = useStore();

  const addItem = (payload: Todo) => {
    dispatch({
      type: "ADD_ITEM",
      payload,
    });

    api
      .post("/v1/todo", JSON.stringify(payload))
      .then((result) => console.log(result));
  };

  const onSubmit = (values: Todo, { resetForm }: any) => {
    console.log(values);
    addItem(values);
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

              <div style={{ marginTop: 3, marginBottom: 3 }}>
                <Field name="isCompleted" type="checkbox" />
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
