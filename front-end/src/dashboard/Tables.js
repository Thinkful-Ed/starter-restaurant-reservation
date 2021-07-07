import { useState, useEffect } from "react";
import { listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Tables() {
  const [tables, setTables] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(loadTables, []);

  function loadTables() {
    console.log("Loading ...");
    const abortController = new AbortController();
    setErr(null);
    listTables(abortController.signal).then(setTables).catch(setErr);
    return () => abortController.abort();
  }

  return (
    <div>
      <ErrorAlert error={err} />
      <table className="table">
        <thead>
          <tr>
            <th>Table Name</th>
            <th>Capacity</th>
            <th>Occupied?</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table) => (
            <tr key={table.table_id}>
              <td>{table.table_name}</td>
              <td>{table.capacity}</td>
              <td>{table.reservation_id === null ? "Free" : "Occupied"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tables;
