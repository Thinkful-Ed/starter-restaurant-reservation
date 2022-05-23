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

  const tableOptions = tables.map(({ table_id, table_name, capacity }) => {
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
    <div className="text-center">
      <h2>Seat Reservation</h2>
      <ErrorAlert error={error} />
      <form
        onSubmit={submitHandle}
        className="d-flex flex-column col-6 text-center m-auto font-weight-bolder"
      >
        <div className="my-2">
          <div className="bg-info text-white border-bottom border-dark">
            <label htmlFor="table_name">Table Name</label>
          </div>
          <div className='border border-dark'>
<select name="table_id" id="table_name" onChange={changeHandle} >
            <option value="">--Please choose a table--</option>
            {tableOptions}
          </select>
          </div>
          
        </div>
        <div className="btn-group border border-dark rounded-lg">
          <button type="submit" className="btn btn-success">Submit</button>
          <button type="button" onClick={cancelHandle} className='btn btn-danger'>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default SeatReservation;
