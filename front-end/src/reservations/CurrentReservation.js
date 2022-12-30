import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { listTables } from "../utils/api";

function CurrentReservation() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

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
      <form>
        <label htmlFor="table_id">Table</label>
        <select name="table_id">
          {tables.map((table) => (
            <option>
              {table.table_name} - {table.capacity}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}

export default CurrentReservation;
