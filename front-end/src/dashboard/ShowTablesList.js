import React, { useEffect, useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables } from "../utils/api";
import ShowTable from "./ShowTable";

function ShowTablesList() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  useEffect(() => {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h5> List of Tables and Status</h5>
      </div>
        <ErrorAlert error={tablesError} />
        <table className="table table-striped">
            <thead>
                <tr className="bg-primary text-white">
                    <th>id#</th>
                    <th>Table Name</th>
                    <th>Capacity</th>
                    <th>Reservation id</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
              {tables.map( (table, index) => <ShowTable key={index.toString()} table={table} index={index}/>)}
            </tbody>
            
        </table>
          {/* {JSON.stringify(tables)}; */}
    </div>
  );
}

export default ShowTablesList;
