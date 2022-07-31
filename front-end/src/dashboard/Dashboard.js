import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { next, previous, today } from "../utils/date-time";
import { useHistory, Link } from "react-router-dom";

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

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  // renders all reservations specified in reservations state
  const reservationsList = () => {
    if (reservations.length < 1) {
      return (
        <>
          <p>There are no reservations for this date.</p>
        </>
      );
    }

    const list = reservations.map((reservation) => {
      return (
        <tr key={reservation.reservation_id}>
          <td>{reservation.first_name}</td>
          <td>{reservation.last_name}</td>
          <td>{reservation.mobile_number}</td>
          <td>{reservation.reservation_date}</td>
          <td>{reservation.reservation_time}</td>
          <td>{reservation.people}</td>
          <td>
            <Link to={`/reservations/${reservation.reservation_id}/seat`}>
              <button className="btn btn-secondary">Seat</button>
            </Link>
          </td>
        </tr>
      );
    });

    return (
      <table className="table mt-3">
        <thead>
          <tr key={date}>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Date</th>
            <th>Time</th>
            <th>People</th>
            <th>Give Table</th>
          </tr>
        </thead>
        <tbody>{list}</tbody>
      </table>
    );
  };

  // changes rendered reservations based on date
  const previousHandler = () => {
    history.push(`/dashboard?date=${previous(date)}`);
  };

  const todayHandler = () => {
    history.push(`/dashboard?date=${today()}`);
  };

  const nextHandler = () => {
    history.push(`/dashboard?date=${next(date)}`);
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date: {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <button className="btn btn-primary mr-1" onClick={previousHandler}>
        Previous
      </button>
      <button className="btn btn-secondary mr-1" onClick={todayHandler}>
        Today
      </button>
      <button className="btn btn-info" onClick={nextHandler}>
        Next
      </button>
      {reservations && reservationsList()}
    </main>
  );
}

export default Dashboard;
