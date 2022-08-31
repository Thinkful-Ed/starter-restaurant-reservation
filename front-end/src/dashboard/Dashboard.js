import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ListReservations from "./ListReservations";
import { previous, next, today } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  setTimeout(() => {
    setIsLoading(false);
  }, 1 * 2500);

  function areReservations() {
    if (reservations.length === 0) {
      if (isLoading) {
        return <h2>Loading...</h2>;
      } else {
        return (
          <h4 className="alert alert-primary">
            There are no reservations for this date yet...
          </h4>
        );
      }
    } else {
      return reservations.map((reservation) => (
        <ListReservations
          key={reservation.reservation_id}
          reservation={reservation}
        />
      ));
    }
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {areReservations()}
      <button
        className="btn btn-primary mr-2 pt-2 pb-2"
        onClick={() => {
          setDate(today());
        }}
      >
        Today
      </button>
      <button
        className="btn btn-secondary mr-2 pt-2 pb-2"
        onClick={() => {
          setDate(previous(date));
        }}
      >
        Previous Date
      </button>
      <button
        className="btn btn-secondary mr-2 pt-2 pb-2"
        onClick={() => {
          setDate(next(date));
        }}
      >
        Next Date
      </button>
    </main>
  );
}

export default Dashboard;
