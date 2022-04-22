import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Buttons from "./Buttons";
import Reservations from "./Reservations";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
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

  const allFinishedReservations = reservations.filter(
    (reservation) =>
      reservation.status === "finished" || reservation.status === "cancelled"
  );

  return (
    <main className=".bg-secondary">
      <h1 className="d-flex justify-content-center">Reservations</h1>
      <div className="d-flex justify-content-center mb-3">
        <h4 className="mb-0">Date: {date}</h4>
      </div>
      <Buttons date={date} />
      <ErrorAlert error={reservationsError} />
      {allFinishedReservations.length === reservations.length &&
        reservations.length > 0 && (
          <h3 className="my-3 d-flex justify-content-center">
            No reservations for this date.
          </h3>
        )}
      {reservations.length > 0 ? (
        <Reservations reservations={reservations} />
      ) : (
        <h3 className="my-3 d-flex justify-content-center">
          No reservations for this date.
        </h3>
      )}
    </main>
  );
}

export default Dashboard;
