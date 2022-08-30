import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ListReservations from "./ListReservations";

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
  console.log(reservations)

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
      <ErrorAlert error={reservationsError} />
      {reservations.map((reservation) => (
        <ListReservations key={reservation.reservation_id} reservation={reservation} />
      ))}
                  <button
              className="btn btn-primary mr-2 pt-2 pb-2"
              onClick={() => {}}
            >
              Today
            </button>
                  <button
              className="btn btn-secondary mr-2 pt-2 pb-2"
              onClick={() => {}}
            >
              Previous Date
            </button>
            <button
              className="btn btn-secondary mr-2 pt-2 pb-2"
              onClick={() => {}}
            >
              Next Date
            </button>
    </main>
  );
}

export default Dashboard;
