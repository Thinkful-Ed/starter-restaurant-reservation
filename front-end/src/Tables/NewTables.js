import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../utils/api";

function NewTables() {
  const initialTable = {
    table_name: "",
    capacity: 1,
  };

  const history = useHistory();

  const [table, setTable] = useState({ ...initialTable });
  const [error, setError] = useState(null);

  const handleChange = ({ target }) => {
    setTable({
      ...table,
      [target.name]: target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    createTable(table, abortController.signal)
      .then(() => history.push("/dashboard"))
      .catch((error) => {
        setError(error);
      });
    return () => abortController.abort();
  };

  return (
    <form onSumbit={handleSubmit}>
      <label htmlFor="table_name">
        Please Enter the Table Name:
        <input
          id="table_name"
          type="text"
          name="table_name"
          onChange={handleChange}
          value={table.table_name}
        />
      </label>
      <label htmlFor="capacity">
        Please Enter Capacity:
        <input
          id="capacity"
          type="number"
          name="capacity"
          onChange={handleChange}
          value={table.capacity}
        />
      </label>
      <button type="submit">Submit</button>
      <button type="cancel" onClick={() => history.go(-1)}>
        Cancel
      </button>
    </form>
  );
}

export default NewTables;
