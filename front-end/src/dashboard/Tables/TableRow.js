import React from "react";

function TableRow({ table, index, loadDashboard }) {
  //upon clicking finish
  //make a DELETE request within utils/api
  //you want to loadDashboard after DELETE promise has resolved so that the state of tables are different

  const handleFinishClick = () => {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      console.log("delete");
      //make a delete request
    }
    return null;
  };

  //knex "tables" has been given a reservation_id that is set to NULL (look at DBeaver). This was done because we joined reservations to tables within migration files
  //if a reservation_id exists within tables, return "Occupied"
  //otherwise, return "Free"
  const status = table.reservation_id ? "Occupied" : "Free";

  return (
    <tr>
      <td>{table.table_id}</td>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td>{status}</td>
      <td>
        <button
          data-table-id-status={table.table_id}
          type="button"
          className="btn btn-primary"
          onClick={handleFinishClick}
        >
          Finish
        </button>
      </td>
    </tr>
  );
}

export default TableRow;
