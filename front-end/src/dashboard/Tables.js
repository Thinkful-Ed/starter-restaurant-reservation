import { useState, useEffect } from "react";
import { listTables, finishTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Tables({ updateAll, setUpdateAll }) {
  const [tables, setTables] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(loadTables, [updateAll]);

  function loadTables() {
    const abortController = new AbortController();
    setErr(null);
    listTables(abortController.signal).then(setTables).catch(setErr);
    return () => abortController.abort();
  }

  function finishHandler(e) {
    const finish = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );
    if (!finish) return;

    finishTable(e.target.getAttribute("data-table-id-finish"))
      .then(() => setUpdateAll((updateAll) => !updateAll))
      .catch(setErr);
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
              <td data-table-id-status={table.table_id}>
                {table.reservation_id === null ? "Free" : "Occupied"}
              </td>
              <td>
                {table.reservation_id === null ? null : (
                  <button
                    data-table-id-finish={table.table_id}
                    onClick={finishHandler}
                  >
                    Finish
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tables;
