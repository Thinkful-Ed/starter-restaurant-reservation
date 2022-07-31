import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables, updateTable } from "../utils/api";

export default function Seat() {
  const params = useParams();
  const history = useHistory();

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(loadDashboard, []);

  function loadDashboard() {
    const abortController = new AbortController();

    listTables(abortController.signal).then(setTables).catch(setTablesError);

    return () => abortController.abort();
  }

  const errorElement = () => {
    return (
      <div className="alert alert-danger">
        <p>ERROR: {tablesError.message}</p>
      </div>
    );
  };

  const tablesOptions = () => {
    return tables.map((table) => {
      return (
        <option key={table.table_id} value={table.table_id}>
          {table.table_name} - {table.capacity}
        </option>
      );
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const abort = new AbortController();

    try {
      await updateTable(
        selectedTable,
        { reservation_id: params.reservation_id },
        abort.signal,
      );
      history.push("/");
    } catch (error) {
      setTablesError(error);
    }
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <div>
      {tablesError && errorElement()}
      <h1>Seat</h1>
      <h4>Reservation {`${params.reservation_id}`}</h4>
      <form onSubmit={submitHandler}>
        <div>
          <label for="table_id" className="col mr-2">
            Table - Capacity
          </label>
          <select
            onChange={(event) => setSelectedTable(event.target.value)}
            name="table_id"
            className="col-1"
          >
            {tablesOptions()}
          </select>
        </div>
        <div className="mt-2">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button className="btn btn-secondary ml-1" onClick={cancelHandler}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
