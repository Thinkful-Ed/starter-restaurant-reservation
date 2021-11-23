import React from "react";

export default function TableInfo({ table }) {
  const status = table.reservation_id ? "Occupied" : "Free";
  return (
    <>
      <tr>
        <th scope="row">{table.table_id}</th>
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        <td data-table-id-status={table.table_id}>{status}</td>
      </tr>
    </>
  );
}
