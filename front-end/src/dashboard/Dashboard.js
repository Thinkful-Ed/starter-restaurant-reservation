import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { previous, next, formatAsDate } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationDate, setReservationDate] = useState(date);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [reservationDate]);

  console.log(reservations);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date: reservationDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const reservationList = (
    <ul>
      {reservations.map((reservation) => {
        return (
          <li key={reservation.reservation_id}>
            <div className="row">
              <div className="col">{reservation.first_name}</div>
              <div className="col">{reservation.last_name}</div>
              <div className="col">{reservation.mobile_number}</div>
              <div className="col">{reservation.reservation_date}</div>
              <div className="col">{reservation.reservation_time}</div>
              <div className="col">{reservation.people}</div>
            </div>
          </li>
        );
      })}
    </ul>
  );

  return (
    <main>
      <h1>Dashboard</h1>
      <button
        type="button"
        onClick={() => setReservationDate(previous(reservationDate))}
      >
        Previous Day
      </button>
      <h1>{formatAsDate(reservationDate)}</h1>
      <button
        type="button"
        onClick={() => setReservationDate(next(reservationDate))}
      >
        Next Day
      </button>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
        <div className="container">{reservationList}</div>
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
