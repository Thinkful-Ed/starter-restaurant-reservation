import React, { useEffect, useState } from "react";
import ErrorAlert from "./ErrorAlert";
const apiUrl = process.env.REACT_APP_API_BASE_URL;
export default function MapTableOptions() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState([]);
  
  useEffect(loadTables, []);

  async function loadTables() {
    let tableData = await fetch(`${apiUrl}/tables`);
    let tables = await tableData.json();
    setTables(tables.data);
  }

  const output = tables.map((table, index) => {
    return (
      <option key={index} value={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  return (
    <>
      {output}
      {tablesError.message && <ErrorAlert error={tablesError} />}
    </>
  );
}