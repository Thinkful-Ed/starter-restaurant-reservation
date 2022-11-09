import React from "react";
import { finishedTable } from "../../utils/api";

function TableRow({ table, loadDashboard }) {
  //upon clicking finish
  //make a DELETE request within utils/api
  //you want to loadDashboard after DELETE promise has resolved so that the state of tables are different

  const handleFinishClick = () => {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      finishedTable(table.table_id)
        .then(loadDashboard)
        .catch((error) => console.log("error", error));
    }
    return null;
  };

  //knex "tables" has been given a reservation_id that is set to NULL (look at DBeaver). This was done because we altered table in knex files
  //if a reservation_id exists within tables, return "Occupied"
  //otherwise, return "Free"
  const status = table.reservation_id ? "Occupied" : "Free";

  return (
    <tr key={table.table_id}>
      <td>{table.table_id}</td>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td data-table-id-status={table.table_id}>{status}</td>
      <td>
        <button
          style={{ backgroundColor: "#C86779", color: "white" }}
          data-table-id-finish={table.table_id}
          type="button"
          className="btn btn-table-finish"
          onClick={handleFinishClick}
        >
          Finish
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
