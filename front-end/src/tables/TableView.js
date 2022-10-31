import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables, updateStatus, deleteTableRes } from "../utils/api";

export default function TableView({ table }) {
  const [currentTable, setCurrentTable] = useState(table);
  const history = useHistory();
  const [tableError, setTableError] = useState(null);

  function handleClear(event) {
    event.preventDefault();
    setTableError(null);
    if (window.confirm("Table cleared? This cannot be undone.")) {
      updateStatus({ status: "Finished" }, currentTable.reservation_id)
        .then(() => deleteTableRes(currentTable.table_id))
        .then(() => {
          setCurrentTable({
            ...table,
            reservation_id: null,
            table_status: "Available",
          });
          listTables();
          history.go(0);
        })
        .catch(setTableError);
    }
  }

  return (
    <div>
      <ErrorAlert error={tableError} />
      <tr>
        <th>{currentTable.table_id}</th>
        <td>{currentTable.table_name}</td>
        <td>{currentTable.capacity}</td>
        <td>{currentTable.reservation_id}</td>
        <td data-table-id-status={`${table.table_id}`}>
          {currentTable.table_status}{" "}
        </td>
        <td data-table-id-finish={`${table.table_id}`}>
          {currentTable.reservation_id ? (
            <button className="btn btn-danger" onClick={handleClear}>
              Finish
            </button>
          ) : (
            <></>
          )}
        </td>
      </tr>
    </div>
  );
}
