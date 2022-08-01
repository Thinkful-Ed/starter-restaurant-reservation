import React from "react";
import { finishTable } from "../utils/api";

export default function Tables({ tables, loadDashboard }) {
  const finishHandler = async (event) => {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone.",
      )
    ) {
      const abort = new AbortController();

      try {
        await finishTable(event.target.value, abort.signal);
        loadDashboard();
        return () => abort.abort();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const listTables = () => {
    return tables.map((table, index) => {
      return (
        <tr key={index}>
          <td>{table.table_name}</td>
          <td>{table.capacity}</td>
          <td data-table-id-status={`${table.table_id}`}>
            {table.reservation_id ? "occupied" : "free"}
          </td>
          <td>{table.reservation_id}</td>
          <td>
            {table.reservation_id && (
              <button
                className="btn btn-info"
                data-table-id-finish={table.table_id}
                onClick={finishHandler}
                value={table.table_id}
              >
                Finish
              </button>
            )}
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <h1>Tables</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Table Name</th>
            <th>Capacity</th>
            <th>Vacancy</th>
            <th>Reservation ID</th>
            <th>Finish</th>
          </tr>
        </thead>
        <tbody>{tables && listTables()}</tbody>
      </table>
    </>
  );
}
