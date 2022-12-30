import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { listTables } from "../utils/api";

const INITIAL_FORM_DATA = {
  table_id: "",
};

function CurrentReservation() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const handleChange = (event) => {
    const { target } = event;
    setFormData({ ...formData, [target.id]: target.value });
  };

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  //get current reservation by reservationId
  const { reservationId } = useParams();
  return (
    <div>
      I AM RESERVATION {reservationId}
      <div>{JSON.stringify(formData)}</div>
      <form>
        <label htmlFor="table_id">Table</label>
        <select
          name="table_id"
          id="table_id"
          value={formData.table_id}
          onChange={handleChange}>
          {tables.map((table) => (
            <option value={table.table_id}>
              {table.table_name} - {table.capacity}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}

export default CurrentReservation;
