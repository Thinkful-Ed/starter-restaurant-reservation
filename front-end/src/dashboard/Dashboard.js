import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next } from "../utils/date-time";
import ResTable from "./ReservationDash/ResTable";
import TableList from "./Tables/TableList";
import "./Dashboard.css";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const history = useHistory();
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadDash, [date]);

  function loadDash() {
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
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
      <div className="d-flex justify-content-center my-3">
        <h1>Dashboard</h1>
      </div>

      <div className="mb-5 d-flex justify-content-center">
        <button className="btn btn-dark mr-1" onClick={handlePrev}>
          Previous
        </button>
        <button className="btn btn-dark mr-1" onClick={handleToday}>
          Today
        </button>
        <button className="btn btn-dark" onClick={handleNext}>
          Next
        </button>
      </div>
      <div className="d-flex justify-content-center mb-1">
        <h4 className="mb-5 ">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div>
        <h3>Reservations:</h3>
        <div>
          <ResTable
            reservations={reservations}
            setReservations={setReservations}
            setError={setReservationsError}
          />
        </div>
      </div>
      <div className="mt-5">
        <h3>Tables:</h3>
        <div>
          <TableList tables={tables} loadDash={loadDash} />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
