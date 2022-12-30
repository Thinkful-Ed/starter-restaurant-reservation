import React, { useEffect, useState } from "react";
import { listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view tables.
 * @returns {JSX.Element}
 */
function TablesSection() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  return (
    <div>
      I AM TABLES
      <ErrorAlert error={tablesError} />
      <div>
        {tables.map((table) => {
          return (
            <div key={table.table_id}>
              <div>{table.table_name}</div>
              <div>{table.capacity}</div>
              <div>{table.reservation_id === null ? "Free" : "Occupied"}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TablesSection;
