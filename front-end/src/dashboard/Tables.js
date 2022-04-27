import React from "react";
import { finishTable } from "../utils/api";
import { useHistory } from "react-router-dom";

function Tables({ tables }) {
  const history = useHistory();
  const handleFinish = async (table_id) => {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      await finishTable(table_id);
      history.go(0);
    }
  };

  return tables.map((table, index) => {
    const { table_id, table_name, capacity, status } = table;
    return (
      <div className="card my-3" key={index}>
        <div className="card-header">
          <b>Table:</b> {table_name}
        </div>
        <div className="card-body">
          <p className="card-text">
            <b>Capacity:</b> {capacity}
          </p>
          <p className="card-text" data-table-id-status={table_id}>
            <b>Status:</b> {status}
          </p>
          {status === "occupied" && (
            <button
              className="btn btn-info btn-lg"
              data-table-id-finish={table_id}
              onClick={() => handleFinish(table_id)}
            >
              Finish
            </button>
          )}
        </div>
      </div>
    );
  });
}

export default Tables;
