import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import {today, previous, next} from "../utils/date-time"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const [date, setDate] = useState(today())
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const location = useLocation();

  useEffect(loadDashboard, [date]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const singleValue = queryParams.get("date");
    if (singleValue) {
      setDate(singleValue);
    }   
  }, []);

 

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date },
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
      <td><button type="button" className="btn btn-secondary">Seat</button></td>
    </tr>
  ));

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-primary" onClick={() => setDate(previous(date))}>
          Previous
        </button>
        <button type="button" class="btn btn-primary" onClick={() => setDate(today())}>
          Today
        </button>
        <button type="button" class="btn btn-primary" onClick={() => setDate(next(date))}>
          Next
        </button>
      </div>
      <div className="d-flex justify-content-between">
        <table className="table table-bordered border-dark table-hover mr-2">
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
        <table className="table table-bordered border-dark table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Table Name</th>
              <th>Capacity</th>
              <th>Occupied?</th>
            </tr>
          </thead>
        </table>
      </div>
    </main>
  );
}

export default Dashboard;
