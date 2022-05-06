import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables, updateTable } from "../utils/api";

function SeatReservation() {
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  const [form, setForm] = useState(null);
  const history = useHistory();
  const { reservationId } = useParams();

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    setError(null);
    listTables(abortController.signal).then(setTables).catch(setError);
    return () => abortController.abort();
  }

  const tableOptions = tables.map(({table_id, table_name, capacity}) => {
    return (
      <option key={table_id} name={table_id} value={table_id}>
        {table_name} - {capacity}
      </option>
    );
  });

  async function submitHandle(event) {
    event.preventDefault();
    try {
      const updatedTable = await updateTable(form);
      if (updatedTable.error) {
        throw updateTable.error;
      }
      history.push("/dashboard");
    } catch (err) {
      setError(err);
    }
  }

  function cancelHandle() {
    history.goBack();
  }

  function changeHandle(event) {
    const selectedTable = tables.filter((table) => {
      return table.table_id.toString() === event.target.value;
    })[0];

    setForm({ ...selectedTable, reservation_id: reservationId });
  }

  return (
    <div>
      <ErrorAlert error={error} />
      <form onSubmit={submitHandle}>
        <label htmlFor="table_name">Table Name</label>
        <select name="table_id" id="table_name" onChange={changeHandle}>
          <option value="">--Please choose a table--</option>
          {tableOptions}
        </select>
        <button type="submit">Submit</button>
        <button type="button" onClick={cancelHandle}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default SeatReservation;
