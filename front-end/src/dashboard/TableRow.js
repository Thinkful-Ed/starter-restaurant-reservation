import React from "react";
import { useHistory } from "react-router-dom";

function TableRow({ table }) {
  const history = useHistory();

  const handleFinish = () => {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone"
      )
    ) {
      history.push(`/dashboard`);
    }
  };

  if (!table) return null;

  return (
    <tr>
      <th scope="row">{table.table_id}</th>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td data-table-id-status={table.table_id}>{table.status}</td>
      {table.status === "occupied" && (
        <td data-table-id-finish={table.table_id}>
          <button onClick={handleFinish} type="button">
            Finish
          </button>
        </td>
      )}
    </tr>
  );
}

export default TableRow;
