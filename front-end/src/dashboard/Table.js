import React from "react";
import { unseatTable } from "../utils/api";

const Table = ({ table, loadDashboard }) => {
  //function to handle click event when finishing a table
  function clickHandler() {
    //display confirmation dialog to confirm finishing the table
    if (window.confirm("Is this table ready to seat new guests?")) {
      const abortController = new AbortController();
      //call the api to unseat the table
      unseatTable(table.table_id, abortController.signal)
        .then(loadDashboard) //reload the dashboard after unseating
        .catch((error) => console.log("error", error));
      return () => abortController.abort();
    }
  }

  return (
    <div>
      <h5>Table Name: {table.table_name}</h5>
      <div>
        <div>
          <div>
            <h5>Capacity: {table.capacity}</h5>
            {/* Display the status of the table */}
            {table.reservation_id ? (
              <>
                <div
                  data-table-id-status={table.table_id}
                  style={{ cursor: "default" }}
                >
                  occupied
                </div>
              </>
            ) : (
              <div
                data-table-id-status={table.table_id}
                style={{ cursor: "default" }}
              >
                Free
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Display the finish button for occupied tables */}
      {table.reservation_id ? (
        <div
          data-table-id-finish={table.table_id}
          onClick={clickHandler}
          role="button"
        >
          <h5>Finish</h5>
        </div>
      ) : null}
    </div>
  );
};

export default Table;
