import React from "react";
import { useHistory } from "react-router";
import { unSeatTable } from "../utils/api";

export default function TableCard({ table }) {
  const history = useHistory();
  const handleFinishClick = async (event) => {
    event.preventDefault();
    const message = `Is this table ready to seat new guests? This cannot be undone.`;

    if (window.confirm(message)) {
      unSeatTable(table.table_id);
      history.go(0);
    }
  };

  function statusText() {
    if (table.reservation_id) {
      return "occupied";
    } else {
      return "free";
    }
  }

  return (
    <tr>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td data-table-id-status={table.table_id}>{statusText()}</td>
      <td>
        {table.reservation_id && (
          <button
            data-table-id-finish={table.table_id}
            className="btn btn-primary"
            onClick={handleFinishClick}
          >
            Finish
          </button>
        )}
      </td>
    </tr>
  );
}
