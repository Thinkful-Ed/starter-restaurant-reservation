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
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      await finishOccupiedTable(table_id);
      history.push("/dashboard");
      history.go(0);
    }
  };

  return (
    <div>
      <h2>TABLES SECTION</h2>
      <ErrorAlert error={tablesError} />
      <div>
        {tables.map((table) => {
          return (
            <div key={table.table_id}>
              <div>{table.table_name}</div>
              <div>{table.capacity}</div>
              <div data-table-id-status={table.table_id}>
                {table.reservation_id === null ? "Free" : "Occupied"}
              </div>
              <div>
                {table.reservation_id !== null && (
                  <button
                    data-table-id-finish={table.table_id}
                    onClick={() => handleFinishTable(table.table_id)}>
                    Finish
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TablesSection;
