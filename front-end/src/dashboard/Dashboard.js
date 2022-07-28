import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";
import { previous, next } from "../utils/date-time";
import ReservationsTable from "./ReservationsTable";
import TablesTable from "./TablesTable";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal)
    .then(setTables);
    return () => abortController.abort();
  }

  function handleToday() {
    history.push(`/dashboard`);
  }

  function handlePrev() {
    const newDate = previous(date);
    history.push(`/dashboard?date=${newDate}`);
  }

  function handleNext() {
    history.push(`/dashboard?date=${next(date)}`);
  }

  return (
    <main>
        <h1>Dashboard</h1>
        <div className="row">
        <div className="col-md-6 col-lg-6 col-sm-12">
          <div className="d-md-flex mb-3">
          <h4 className="box-title mb-0">Reservations for {date}</h4>
        </div>
        <div className="btn-group" role="group" aria-label="navigation buttons">
          <button className="btn btn-secondary" onClick={handlePrev}>
            Previous
          </button>
          <button className="btn btn-secondary" onClick={handleToday}>
            Today
          </button>
          <button className="btn btn-secondary" onClick={handleNext}>
            Next
          </button>
        </div>
        <div>
          <ErrorAlert error={reservationsError} />
        </div>
        <div className="table-responsive">
              <ReservationsTable
                reservations={reservations}
                loadDashboard={loadDashboard} 
              />

      </div>
      </div>
      <div className="col-md-6 col-lg-6 col-sm-12">
        <div className="table-responsive">
              <TablesTable tables={tables} loadDashboard={loadDashboard} />
        </div>
      </div>
      </div>
    </main>
  );
}

export default Dashboard;