import React from "react";

function TablesList({ table }) {
  return (
    <tr>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td data-table-id-status={`${table.table_id}`}>{table.reservation_id ? 'Occupied' : 'Free'}</td>
    </tr>
  );
}

export default TablesList;
