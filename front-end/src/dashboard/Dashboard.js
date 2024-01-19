import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { useLocation } from "react-router-dom";
import { today, previous, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";


/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [date, setDate] = useState(query.get("date") || today());

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations( {date}, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <button
        onClick={() => setDate(previous(date))}
        className="btn btn-sm btn-light"
      >
        Previous Day
      </button>
      <button
        className="mx-3 btn btn-sm btn-light"
        onClick={() => setDate(today())}
      >
        Today
      </button>
      <button
        onClick={() => setDate(next(date))}
        className="btn btn-sm btn-light"
      >
        Next Day
      </button>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
