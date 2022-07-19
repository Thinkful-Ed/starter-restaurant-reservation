import React from "react";
import { useHistory } from "react-router-dom";
import TableForm from "./TableForm"

function NewTable() {
  const history = useHistory();
  const initialFormState = {
    table_name: "",
    capcity: ""
  };

  return (
    <TableForm />
  );
}

export default NewTable;
