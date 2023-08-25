import React from "react";
// import { finishTable, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function TablesList({ tables , tablesError, handleClick}) {
  

  // async function loadDashboard() {
  //   const abortController = new AbortController();
  //   try {
  //     const tablesData = await listTables(abortController.signal);
  //     setTables(tablesData);
  //   } catch (error) {
  //     setTablesError(error);
  //   }
  //   return () => abortController.abort();
  // }

  // useEffect(() => {
  //   loadDashboard();

    
  // }, [date]);



  return (
    <>
      <h3>Tables:</h3>
      <ErrorAlert error={tablesError} />
      <div className="table table-responsive table-sm">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Table name</th>
              <th>Capacity</th>
              <th>Table status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table) => (
              <tr key={table.table_id}>
                <td>{table.table_name}</td>
                <td>{table.capacity}</td>
                <td data-table-id-status={table.table_id}>
                  {table.reservation_id === null ? "Free" : "Occupied"}
                </td>
                <td >
                  {table.reservation_id && (
                    <div>
                      <button
                        className="btn btn-danger"
                        type="button"
                        data-table-id-finish={table.table_id}
                        onClick={(e) => handleClick(e, table.table_id)}
                      >
                        Finish
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TablesList;
