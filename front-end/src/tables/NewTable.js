import React, { useState } from "react";
import { useHistory } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { postTables } from "../utils/api";
import TableForm from "./TableForm";

function NewTable() {
  const initialFormState = {
    table_name: "",
    capacity: 0,
  };

  const [table, setTable] = useState({ ...initialFormState });
  const [tableError, setTableError] = useState([]);

  const history = useHistory();

  const changeHandler = ({ target }) => {
    setTable({ ...table, [target.name]: target.value });
  };

  //
  async function submitHandler(event) {
    const abortController = new AbortController();
    event.preventDefault();
    let newTable = table;
    newTable.capacity = Number(newTable.capacity);

    try {
      await postTables(newTable, abortController.signal);
      setTable(initialFormState);
      history.push(`/dashboard`);
    } catch (error) {
      setTableError([error.message]);
    }

    return () => {
      abortController.abort();
    };
  }

  return (
    <section>
      <div>
        <h2>Tables</h2>
        <ErrorAlert error={tableError} />
        <TableForm
          table={table}
          submitHandler={submitHandler}
          changeHandler={changeHandler}
        />
      </div>
    </section>
  );
}

export default NewTable;