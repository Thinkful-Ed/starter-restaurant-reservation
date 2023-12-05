import React from "react";
import { deleteReservationIdFromTable, listTables } from "../utils/api";

function TableView({ table, setTables }) {

  async function finishTable() {
    const shouldFinish = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );

    if (shouldFinish) {
      try {
        await deleteReservationIdFromTable(table.table_id, table.reservation_id);
        const updatedTables = await listTables();
        setTables(updatedTables);
      } catch (error) {
        console.error("Error finishing table:", error.message);
      }
    }
  }

    return (
      <div>
        <p>{table.table_id}</p>
        <p>Name: {table.table_name} - Capacity: {table.capacity}</p>
        <p data-table-id-status={table.table_id}>
        {table.reservation_id ? 
          // <p className={`data-table-id-status=${table.table_id}`}>Occupied</p>
          "Occupied"
         : 
          // <p className={`data-table-id-status=${table.table_id}`}>Free</p>
          "Free"
        }</p>
        {table.reservation_id ? (
        <button onClick={finishTable} data-table-id-finish={table.table_id} data-reservation-id-finish={table.reservation_id} className="btn btn-primary m-1">
                  Finish
                </button>
                ) : (
                  ""
                )}
      </div>
    );
  }

export default TableView;