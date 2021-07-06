import { useState, useEffect } from "react";
import { listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Tables() {
  const [tables, setTables] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    setErr(null);
    listTables(abortController.signal).then(setTables).catch(setErr);
    return () => abortController.abort();
  }

  return (
    <div>
      <ErrorAlert error={err} />
      <table className="table">
        <tr>
          <th>Table Name</th>
          <th>Capacity</th>
          <th>Occupied?</th>
        </tr>
        {tables.map((table) => (
          <tr key={table.table_id}>
            <td>{table.table_name}</td>
            <td>{table.capacity}</td>
            <td>{table.reservation_id === -1 ? "Free" : "Occupied"}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Tables;
