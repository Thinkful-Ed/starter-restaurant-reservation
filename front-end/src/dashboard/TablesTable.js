import ErrorAlert from "../layout/ErrorAlert";
import React, { useState, useEffect } from "react";
import { listTables, finishTable } from "../utils/api";
import { useHistory } from "react-router-dom";
import "./Table.css"

const TablesTable = () => {
  const history = useHistory();

  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  function handleFinish({ target }) {
    const result = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );
    if (result) {
      const table_id = target.id;
      const abortController = new AbortController();
      finishTable(table_id, abortController.signal).then(() => {
        history.push("/");
      });
    }
  }

  function renderTable(tables) {
    return (
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Table Name</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((table) => (
              <tr key={table.table_id}>
                <td>{table.table_name}</td>
                <td>
                  <p data-table-id-status={table.table_id}>
                    {table.reservation_id ? "Occupied" : "Free"}
                  </p>
                </td>
                <td>
                  {table.reservation_id && (
                    <button
                      className="btn btn-danger ml-1"
                      id={table.table_id}
                      data-table-id-finish={table.table_id}
                      value={table.reservation_id}
                      onClick={handleFinish}
                    >
                      Finish
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      <ErrorAlert error={tablesError} />
      {renderTable(tables)}
    </div>
  );
};

export default TablesTable;
