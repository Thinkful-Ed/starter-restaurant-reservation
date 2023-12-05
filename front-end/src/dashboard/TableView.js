import React from "react";

function TableView({ table }) {
    return (
      <div>
        <p>Name: {table.table_name} - Capacity: {table.capacity}</p>
        {table.reservation_id ? (
          <p className={`data-table-id-status-${table.table_id}`}>Occupied</p>
        ) : (
          <p className={`data-table-id-status-${table.table_id}`}>Free</p>
        )}
      </div>
    );
  }

export default TableView;