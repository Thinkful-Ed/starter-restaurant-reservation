import React from "react";
import { clearTable } from "../utils/api";
import { useHistory } from "react-router";

function TableList({ tableData }) {
  const history = useHistory();

  async function finishHandle(tableId) {
    const confirm = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );
    if (confirm) {
      await clearTable(tableId);
      history.go(0);
    }
  }

  function FinishButton({ table }) {
    if (table.reservation_id) {
      return (
        <button
          data-table-id-finish={table.table_id}
          type="button"
          onClick={() => finishHandle(table.table_id)}
        >
          Finish
        </button>
      );
    } else {
      return "";
    }
  }

  const formatedTables = tableData.map((table) => {
    return (
      <div key={table.table_id}>
        <h3>{table.table_name}</h3>
        <span data-table-id-status={table.table_id} value={table.table_id}>
          {table.reservation_id ? "occupied" : "free"}
        </span>
        <FinishButton table={table} />
      </div>
    );
  });

  return formatedTables;
}

export default TableList;
