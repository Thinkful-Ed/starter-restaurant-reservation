import React, { useEffect, useState } from "react";
import { finishTable, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function TablesList({ date }) {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const abortController = new AbortController();

  async function loadDashboard() {
    try {
      const tablesData = await listTables(abortController.signal);
      setTables(tablesData);
    } catch (error) {
      setTablesError(error);
    }
    return () => abortController.abort();
  }

  useEffect(() => {
    loadDashboard();

    return () => abortController.abort();
  }, [date]);

  async function handleClick(e, table_id) {
    e.preventDefault();
    setTablesError(null);

    const confirmation = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );

    if (confirmation) {
      try {
        await finishTable(table_id, abortController.signal);
        await loadDashboard();
      } catch (error) {
        console.error(error);
        setTablesError(error);
      }
    }

    abortController.abort();
  }

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
                <td>
                  {table.reservation_id === null ? "Free" : "Seated"}
                </td>
                <td>
                  {table.reservation_id && (
                    <div>
                      <button
                        className="btn btn-danger"
                        type="button"
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
