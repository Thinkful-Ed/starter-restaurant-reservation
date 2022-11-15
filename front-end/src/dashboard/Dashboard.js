import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import ReservationTable from "./reservationsCard/ReservationTable";
import ErrorAlert from "../layout/ErrorAlert";
import CurrentDateToggle from "./reservationsCard/CurrentDateToggle";
import TablesTable from "./tablesCard/TablesTable";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

/* Edits to be made:
      - Add Seat button to reservations linking to seat page
      - Add Tables table with Free / Occupied tag
        - Add load tables + availability function to loadDashboard
      - CLEAN
        - Create file for the card?
 */

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const [currentDate, setCurrentDate] = useState(getDate());
  const history = useHistory();

  useEffect(loadDashboard, [currentDate, history]);

  function getDate() {
    const queryParams = new URLSearchParams(window.location.search);
    const dateTerm = queryParams.get("date");
    return dateTerm ? dateTerm : date;
  }

  function loadDashboard() {
    history.push(`/dashboard?date=${currentDate}`);
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null);
    listReservations({date: currentDate}, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables({ date: currentDate }, abortController.signal)
      .then(setTables)
      .catch(setTablesError);
    return () => abortController.abort();
  }  

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="row">
        <div className="col-6 mb-3">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Reservations for {currentDate}</h4>
            </div>
            <div className="card-body">
              <ErrorAlert error={reservationsError} />
              <ReservationTable reservations={reservations} />
            </div>
            <CurrentDateToggle history={history} setCurrentDate={setCurrentDate} currentDate={currentDate}/>
          </div>
        </div>
        <div className="col-6 mb-3">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title mb-0">Tables</h4>
            </div>
            <div className="card-body">
              <ErrorAlert error={tablesError} />
              <TablesTable tables={tables} />
            </div>
          </div>
        </div>
      </div>
      
    </main>
  );
}

export default Dashboard;
