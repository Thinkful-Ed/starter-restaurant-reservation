import React, { useEffect, useState } from "react";
import { finishOccupiedTable, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view tables.
 * @returns {JSX.Element}
 */
function TablesSection() {
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

  const handleFinishTable = async (table_id) => {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone.",
      )
    ) {
      await finishOccupiedTable(table_id);
      history.push("/dashboard");
      history.go(0);
    }
  };

  return (
    <div>
      <h4>TABLES SECTION</h4>
      <ErrorAlert error={tablesError} />
      <div>
        {tables.map((table) => {
          return (
            <div key={table.table_id}>
              <table>
                <tr>
                  <th>Table name</th>
                  <td>{table.table_name}</td>
                </tr>
                <tr>
                  <th>Table Capacity</th>
                  <td>{table.capacity}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>
                    {" "}
                    <div data-table-id-status={table.table_id}>
                      {table.reservation_id === null ? "Free" : "Occupied"}
                    </div>
                  </td>
                  <td>
                    &nbsp;
                    <div>
                      {table.reservation_id !== null && (
                        <button
                          className="btn btn-primary"
                          data-table-id-finish={table.table_id}
                          onClick={() => handleFinishTable(table.table_id)}
                        >
                          Finish
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TablesSection;
