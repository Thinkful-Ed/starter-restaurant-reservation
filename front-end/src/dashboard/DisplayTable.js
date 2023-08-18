import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

function DisplayTable({ table }) {
  const { reservation_id } = useParams();
  const location = useLocation();
  const history = useHistory();

  function finishHandler(table_id) {
    async function updateTable(table_id) {
      const abortController = new AbortController();
      const signal = abortController.signal;
      try {
        const response = await axios.delete(
          `${API_BASE_URL}/tables/${table_id}/seat`,
          { data: { reservation_id: reservation_id } },
          { signal }
        );

        history.push({
          pathname: `/dashboard`,
          state: { shouldReload: true },
        });
      } catch (error) {
        console.log(error, "error updating table");
      }
    }
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      updateTable(table_id);
    }
  }

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title"> {table.table_name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Capacity: {table.capacity}
          </h6>
          <p className="card-text" data-table-id-status={table.table_id}>
            Status: {table.reservation_id ? "Occupied" : "Free"}
          </p>
          {table.reservation_id ? (
            <button
              className="btn btn-primary"
              data-table-id-finish={table.table_id}
              onClick={() => finishHandler(table.table_id)}
            >
              Finish
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default DisplayTable;
