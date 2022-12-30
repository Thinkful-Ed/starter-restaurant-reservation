import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { listTables, setTableToOccupied } from "../utils/api";

const INITIAL_FORM_DATA = {
  table_id: "",
};

function CurrentReservation() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const { reservationId } = useParams();
  const [reservationsError, setReservationsError] = useState(null);
  useEffect(loadTables, []);

  const handleChange = (event) => {
    const { target } = event;
    setFormData({ ...formData, [target.id]: target.value });
  };

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  async function onSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();

    try {
      console.log("formData", formData);
      await setTableToOccupied(
        formData.table_id,
        reservationId,
        abortController.signal
      );
      // history.push(`/dashboard?date=${formData.reservation_date}`);
    } catch (error) {
      setReservationsError(error);
    }
  }

  return (
    <div>
      I AM RESERVATION {reservationId}
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
            <option value={table.table_id}>
              {table.table_name} - {table.capacity}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CurrentReservation;
