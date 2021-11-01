import { useField } from "formik";
import { TextField } from "@material-ui/core";
import { InputFormFieldType } from "../interfaces/InputFormField";

function InputField({ name, label, type = "text" }: InputFormFieldType) {
  const [field] = useField({ name, type });

  return (
    <TextField
      style={{ width: 500, marginBottom: 5 }}
      {...field}
      label={label}
      type={type}
    />
  );
}

export default InputField;
