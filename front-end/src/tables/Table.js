import React, { useState } from "react";
import { clearTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";

const TableList = ({ table }) => {
  const [error, setError] = useState(null);
  const history = useHistory()

  async function handleFinish(tableId) {
    if (
      window.confirm(
        "Is this table ready to seat new guests?  This cannot be undone."
      )
    ) {
      try {
        await clearTable(tableId);
        history.go()
      } catch (err) {
        setError(err);
      }
    }
  }

  const people = table.capacity < 2 ? "person" : "people"
  const occupancy = table.reservation_id ? "Occupied" : "Free"

  return (
    <div className="table">
      <div key={table.table_id} className="card col-md-auto bg-light">
        <ErrorAlert error={error} />
        <div className="card-body">
          <h5 className="card-title">Table {table.table_name}</h5>
          <p className="card-text"><small className="text-muted">Sits {table.capacity} {people}</small></p>
          <p className="card-text" data-table-id-status={table.table_id}>Status: {occupancy}</p>
          {table.reservation_id && <button
            className="btn btn-primary"
            data-table-id-finish={`${table.table_id}`}
            onClick={() => handleFinish(table.table_id)}
          >
            Finish
          </button>}
        </div>
      </div>
    </div>
  );
};

export default TableList;