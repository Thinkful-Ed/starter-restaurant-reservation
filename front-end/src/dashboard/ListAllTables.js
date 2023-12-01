import { useEffect, useState } from "react";
import { deleteReservationFromTable, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * @returns {JSX.Element} a table with a list of all tables.
 *
 */

function ListAllTables() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal)
      .then(setTables)
      .then(() => {})
      .catch(setTablesError);
    return () => abortController.abort();
  }

  function finishHandler(table_id, reservation_id) {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();
      deleteReservationFromTable(table_id, abortController.signal)
        .then(() => {
          window.location.reload();
        })
        .catch(setTablesError);

      return () => abortController.abort();
    }
  }

  const tableRows = tables.map((table) => {
    return (
      <tr key={table.table_id} data-table-id-status={table.table_id}>
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        <td>{table.reservation_id ? "occupied" : "free"}</td>
        <td>{table.reservation_id ? table.reservation_id : ""}</td>
        <td>
          {table.reservation_id ? (
            <button
              data-table-id-finish={`${table.table_id}`}
              onClick={() =>
                finishHandler(table.table_id, table.reservation_id)
              }
            >
              Finish
            </button>
          ) : null}
        </td>
      </tr>
    );
  });

  return (
    <div>
      <ErrorAlert error={tablesError} />
      <h1>Tables</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Table Name</th>
            <th>Capacity</th>
            <th>Status</th>
            <th>Reservation Id</th>
            <th>Clear Table</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}

export default ListAllTables;
