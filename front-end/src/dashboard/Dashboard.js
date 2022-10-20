import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import TableResDetails from "./TableResDetails";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, previousDate, nextDate }) {
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

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <div className="btn-gorup">
        <button type="button" className="btn btn-secondary">
          {String.fromCharCode(8592)} Previous
        </button>
        <button type="button" className="btn btn-secondary">
          Today
        </button>
        <button type="button" className="btn btn-secondary">
          Next {String.fromCharCode(8594)}
        </button>
      </div>
      <div className="TableResDetails">
        <TableResDetails
          reservations={reservations}
          date={date}
          previousDate={previousDate}
          nextDate={nextDate}
        />
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
