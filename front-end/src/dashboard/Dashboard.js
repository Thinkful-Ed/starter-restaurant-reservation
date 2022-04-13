import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import {previous, next} from "../utils/date-time"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [params, setParams] = useState(null);
  const [reservationsError, setReservationsError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const singleValue = queryParams.get("date");
    setParams(singleValue);
  }, []);

  useEffect(loadDashboard, [params, date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations(
      params ? { date: params } : { date },
      abortController.signal
    )
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const reservationRows = reservations.map((reservation) => (
    <tr key={reservation.reservation_id}>
      <td>{`${reservation.last_name}, ${reservation.first_name}`}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.people}</td>
    </tr>
  ));

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {params ? params : date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-primary" onClick={() => setParams(previous(date))}>
          Previous
        </button>
        <button type="button" class="btn btn-primary" onClick={() => setParams(date)}>
          Today
        </button>
        <button type="button" class="btn btn-primary" onClick={() => setParams(next(date))}>
          Next
        </button>
      </div>
      <table className="table table-bordered border-dark table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Reservation Time</th>
            <th>Number of People in Party</th>
          </tr>
        </thead>
        <tbody>{reservationRows}</tbody>
      </table>
    </main>
  );
}

export default Dashboard;
