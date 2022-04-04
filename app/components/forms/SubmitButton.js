import React from "react";
import { useFormikContext } from "formik";

import Button from "../Button";

function SubmitButton({ title, size }) {
  const { handleSubmit } = useFormikContext();

  return <Button title={title} size={size} onPress={handleSubmit} />;
}

export default SubmitButton;
