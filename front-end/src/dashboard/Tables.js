import { useState, useEffect } from "react";
import { listTables } from "../utils/api";

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
      <table className="table">
        <tr>
          <th>Table Name</th>
          <th>Capacity</th>
          <th>Occupied?</th>
        </tr>
        {tables.map((table) => (
          <tr>
            <td>{table.table_name}</td>
            <td>{table.capacity}</td>
            <td>{table.occupied ? "Occupied" : "Free"}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Tables;
