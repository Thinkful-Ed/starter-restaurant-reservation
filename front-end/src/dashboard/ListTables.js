import React, { useState } from "react";
import { finishTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function ListTables({ tables, loadDashboard, loadTables }) {
  const [finishTableError, setFinishTableError] = useState(null);

  function handleFinish(table_id) {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();
      setFinishTableError(null);
      finishTable(table_id, abortController.signal)
        .then(loadDashboard)
        .then(loadTables)
        .catch(setFinishTableError);
      return () => abortController.abort();
    }
  }

  const displayTables = tables.sort().map((table, index) => {
    return (
      <>
        {table.occupied || table.reservation_id ? (
          <tr key={table.table_id}>
            <th scope="row">{table.table_id}</th>
            <td>{table.table_name}</td>
            <td>{table.capacity}</td>
            <td>{table.reservation_id}</td>
            <td>
              <p data-table-id-status={table.table_id}>Occupied</p>
            </td>
            <td>
              <button
                data-table-id-finish={table.table_id}
                className="btn btn-outline-primary"
                onClick={() => handleFinished(table.table_id)}
              >
                Finish
              </button>
            </td>
          </tr>
        ) : (
          <tr key={index}>
            <th scope="row">{table.table_id}</th>
            <td>{table.table_name}</td>
            <td>{table.capacity}</td>
            <td>{table.reservation_id}</td>
            <td>
              <p className="col" data-table-id-status={table.table_id}>
                Free
              </p>
            </td>
          </tr>
        )}
      </>
    );
  });

  return (
    <>
      <ErrorAlert error={finishTableError} />
      <div>
        <table className="table align-middle">
          <caption>Tables</caption>
          <thead>
            <tr>
              <th scope="col">ID #</th>
              <th scope="col">Table Name</th>
              <th scope="col">Table Capacity</th>
              <th scope="col">Reservation ID#</th>
              <th scope="col">Occupied?</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{displayTables}</tbody>
        </table>
      </div>
    </>
  );
}

export default ListTables;
