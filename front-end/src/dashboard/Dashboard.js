import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationList from "./ReservationList";
import { today, previous, next } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function nextDate() {
    setDate(next(date))
  }

  function prevDate() {
    setDate(previous(date))
  }

  function todaysDate() {
    setDate(today())
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <button className="btn btn-primary mx-2" onClick={prevDate}>
            Previous Date
      </button>
      <button className="btn btn-primary mx-2" onClick={todaysDate}>
            Today
      </button>
      <button className="btn btn-primary mx-2" onClick={nextDate}>
            Next Date
      </button>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">{`Reservations for ${date}`}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <ReservationList reservations={reservations} />
    </main>
  );
}

export default Dashboard;
