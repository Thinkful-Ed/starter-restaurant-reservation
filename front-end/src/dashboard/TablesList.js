import React from "react";

function TablesList({ table }) {
  return (
    <tr>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
    </tr>
  );
}

export default TablesList;
