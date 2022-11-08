import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { finishTableReservation, updateReservationStatus } from "../utils/api";
import "./tablesinfo.css";
function TablesInfo({ table, setError, index }) {
  const [currentTable, setCurrentTable] = useState(table);
  const history = useHistory();

  const handleFinishTable = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setError(null);
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      Promise.all([
        updateReservationStatus(
          "finished",
          currentTable.reservation_id,
          abortController.signal
        ).catch(setError),
        finishTableReservation(event.target.value, abortController.signal)
          .then(() => history.push("/"))
          .catch(setError),
      ]);
    }
    return () => abortController.abort();
  };
  return (
    <div className="table-card" key={index}>
      <div className="table-row">
        <div className="table-data">Table ID: {currentTable.table_id}</div>
        <div className="table-data">Table Name: {currentTable.table_name}</div>
        <div className="table-data">Capacity: {currentTable.capacity}</div>
      </div>
      <div className="table-row-1">
        <div className="table-data">Reservation ID: {currentTable.reservation_id}</div>
        <div className="table-data" data-table-id-status={`${table.table_id}`}>
          Status:{currentTable.reservation_id ? "occupied" : "free"}
        </div>
        <div className="table-data">
          {currentTable.reservation_id ? (
            <button
              type="submit"
              onClick={handleFinishTable}
              data-table-id-finish={`${table.table_id}`}
              value={table.table_id}
              className="table-button"
            >
              Finish
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default TablesInfo;
