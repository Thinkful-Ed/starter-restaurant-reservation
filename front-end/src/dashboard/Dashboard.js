import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";
import { previous, today, next } from "../utils/date-time";

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

  const ReservationsList = reservations.map((reservation, index) => {
    return (
      <tr id={reservation.reservation_id} key={index}>
        <td>{reservation.reservation_id}</td>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.people}</td>
      </tr>
    );
  });
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date: {date} </h4>
      </div>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => history.push(`/dashBoard?date=${previous(date)}`)}
        >
          &lt; Previous
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => history.push(`/dashBoard?date=${today()}`)}
        >
          Today
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => history.push(`/dashBoard?date=${next(date)}`)}
        >
          Next &gt;
        </button>
      </div>
      <ErrorAlert error={reservationsError} />
      {/* {JSON.stringify(reservations)} */}
      <div className="table-responsive">
        <table className="table no-wrap">
          <thead>
            <tr>
              <th className="border-top-0">#</th>
              <th className="border-top-0">First Name</th>
              <th className="border-top-0">Last Name</th>
              <th className="border-top-0">Mobile Number</th>
              <th className="border-top-0">Reservation Date</th>
              <th className="border-top-0">Reservation Time</th>
              <th className="border-top-0">People</th>
            </tr>
          </thead>
          <tbody>{ReservationsList}</tbody>
        </table>
      </div>
    </main>
  );
}

export default Dashboard;
