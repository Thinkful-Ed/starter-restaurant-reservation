import React from "react";
import { finishTable } from "../utils/api";
import { useHistory } from "react-router";

export default function TableList({ table, setTablesError }) {
  const history = useHistory();

  // This function sends a PUT request, which updates status of reservation to cancelled
  async function clearTable(event) {
    event.preventDefault();
    const abortController = new AbortController();
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      try {
        await finishTable(table.table_id, abortController.signal);
        history.go(0);
      } catch (error) {
        setTablesError([error.message]);
      }
    }
  }

  return (
    <div key={table.table_id} className="card border-dark text-center mb-3">
      <h4 className="card-header bg-dark text-white">
        Table: {table.table_name}
      </h4>
      <p data-table-id-status={`${table.table_id}`} value={table.table_id}>
        Table Availability: {table.reservation_id ? "occupied" : "free"} <br />
        Capacity: {table.capacity}
      </p>
      {table.reservation_id && (
        <div>
          <button
            className="btn btn-outline-dark"
            name={table.table_id}
            data-table-id-finish={table.table_id}
            onClick={clearTable}
          >
            Finish
          </button>
        </div>
      )}
    </div>
  );
}