import ErrorAlert from "../layout/ErrorAlert";
import React, { useState, useEffect } from "react";
import { listTables } from "../utils/api";


const TablesTable = () => {

    const [tables, setTables] = useState([]);
    const [tablesError, setTablesError] = useState(null);
  
    useEffect(loadTables, []);
  
  
    function loadTables() {
      const abortController = new AbortController();
      setTablesError(null);
      listTables(abortController.signal)
        .then(setTables)
        .catch(setTablesError);
      return () => abortController.abort();
    }

    function renderTable (tables) {

        return (
          <div className="row g-2">
            <table className="table table-dark">
      <thead>
        <tr>
          <th scope="col">Table Name</th>
          <th scope="col">Status</th>   
        </tr>
      </thead>
      <tbody>
      {tables.map(({table_id, table_name, status}) => (
                <tr key={table_id}>
                <td>{table_name}</td>
                <td data-table-id-status={`${table_id}`}>{status}</td>
              </tr>
        ))}
      </tbody>
    </table>
    
          </div> 
        )
      }

    return ( 
        <div>
        <ErrorAlert error={tablesError}/>
        {renderTable(tables)}
        </div>
     );
}
 
export default TablesTable;