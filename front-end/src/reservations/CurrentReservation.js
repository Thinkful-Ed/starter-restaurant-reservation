import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { listTables, setTableToOccupied } from "../utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";

const INITIAL_FORM_DATA = {
  table_id: "",
};

function CurrentReservation() {
  const history = useHistory();
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const { reservationId } = useParams();
  useEffect(loadTables, []);

  const handleChange = (event) => {
    const { target } = event;
    setFormData({ ...formData, [target.id]: target.value });
  };

  function loadTables() {
    const abortController = new AbortController();
    setReservationsError(null);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  async function onSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();

    try {
      await setTableToOccupied(
        formData.table_id,
        reservationId,
        abortController.signal
      );
      history.push(`/dashboard`);
    } catch (error) {
      setReservationsError(error);
    }
  }

  function handleCancel() {
    history.goBack();
  }

  return (
    <div>
      I AM RESERVATION {reservationId}
      <ErrorAlert error={reservationsError} />
      <div>{JSON.stringify(formData)}</div>
      <form onSubmit={onSubmit}>
        <label htmlFor="table_id">Table</label>
        <select
          name="table_id"
          id="table_id"
          value={formData.table_id}
          onChange={handleChange}>
          <option value="" disabled>
            Select a table
          </option>
          {tables.map((table) => (
            <option value={table.table_id} key={table.table_id}>
              {table.table_name} - {table.capacity}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default CurrentReservation;
