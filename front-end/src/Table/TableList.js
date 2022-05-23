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
          className="btn btn-success"
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
      <div key={table.table_id} className="border-bottom border-dark">
        <h4>Table Name : {table.table_name}</h4>
        <span data-table-id-status={table.table_id} value={table.table_id}>
          Status : {table.reservation_id ? "occupied" : "free"}
        </span>
        <div>
          <FinishButton table={table} />
        </div>
      </div>
    );
  });

  return formatedTables;
}

export default TableList;
