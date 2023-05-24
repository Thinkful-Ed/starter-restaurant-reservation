import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch, useHistory, useQuery, useLocation } from "react-router";
import { listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import DashboardTableItem from "./DashboardTableItem";

function DashboardTableList({loadDashboard, reservations, setReservations, reservationsError, setReservationsError}) {
    const [Tables, setTables] = useState([]);
    const [TablesError, setTablesError] = useState(null);
  
    useEffect(loadTableDashboard, []);
  
    function loadTableDashboard() {
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
            <th>Finish Table</th>
          </tr>
          {Tables.map(table=><DashboardTableItem loadDashboard={loadDashboard} table={table} setTablesError={setTablesError} setTables={setTables} reservations={reservations} setReservations={setReservations} reservationsError={reservationsError} setReservationsError={setReservationsError}/>)}
        </table>
        <ErrorAlert error={TablesError} />
    </div>
}

export default DashboardTableList