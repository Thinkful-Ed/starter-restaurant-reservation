import { listTables } from "../utils/api";
import { useState, useEffect } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import ClearButton from "./ClearButton";

function TableList() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  let display;
  if (tables.length) {
      display = tables.map((table) => {
        return (
          <tr key={table.table_id}>
            <td>{table.table_name}</td>
            <td>{table.capacity}</td>
            <td data-table-id-status={table.table_id}>
              {table.reservation_id ? "Occupied" : "Free"}
            </td>
            <td>
                {table.reservation_id ? <ClearButton table_id={table.table_id}/> : null}
            </td>
          </tr>
        );
      });
  }
  return (
    <div>
        <h1>Tables</h1>
      <ErrorAlert error={tablesError} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Table</th>
            <th scope="col">Capacity</th>
            <th scope="col">Occupied</th>
            <th scope="col">Clear table</th>
          </tr>
        </thead>
        <tbody>
            {tables.length ? display : null}
        </tbody>
      </table>
      {!tables.length && "Please add at least 1 table"}
    </div>
  );
}

export default TableList;
