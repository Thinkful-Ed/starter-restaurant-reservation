import { useState, useEffect } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables } from "../utils/api";

function TableList() {
  const [tables, setTables] = useState([]);

  const [tablesError, setTablesError] = useState("");
 

  useEffect(() => {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }, []);

  const tableList = tables.map(({ table_name, capacity, table_id }) => (
    <tbody key={table_id}>
      <tr>
        <td>{table_name}</td>
        <td>{capacity}</td>
        <td>Free</td>
      </tr>
    </tbody>
  ));

  //JSX
  return (
    <>
      <div>
        <table className="table">
          <thead>
            <tr>
              <td>Table Number</td>
              <td>Capacity</td>
              <td>Status</td>
            </tr>
          </thead>
          {tableList}
        </table>
      </div>
      <ErrorAlert error={tablesError} />
    </>
  );
}

export default TableList;
