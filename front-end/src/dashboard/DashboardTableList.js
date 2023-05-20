import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch, useHistory, useQuery, useLocation } from "react-router";
import { listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import DashboardTableItem from "./DashboardTableItem";

function DashboardTableList({date}) {
    const [Tables, setTables] = useState([]);
    const [TablesError, setTablesError] = useState(null);
  
    useEffect(loadDashboard, []);
  
    function loadDashboard() {
      const abortController = new AbortController();
      setTablesError(null);
      listTables(abortController.signal)
        .then(setTables)
        .catch(setTablesError);
      return () => abortController.abort();
    }
    
    return <div>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">Tables</h4>
        </div>
        <table>
          <tr>
            <th>Table Name</th>
            <th>Capacity</th>
            <th>Status</th>
          </tr>
          {Tables.map(table=><DashboardTableItem table={table}/>)}
        </table>
        <ErrorAlert error={TablesError} />
    </div>
}

export default DashboardTableList