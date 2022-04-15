import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
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
  const [tables, setTables] = useState([])
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

  useEffect(() => {
    const ac = new AbortController()
    listTables(ac.signal)
    .then(setTables)
    .catch(setReservationsError)

    return () => ac.abort()
  }, [])

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
      <td><Link to={`/reservations/${reservation.reservation_id}/seat`}><button type="button" className="btn btn-secondary">Seat</button></Link></td>
    </tr>
  ));

  const tableRows = tables.map((table) => (
    <tr key={table.table_id}>
      <td>{table.table_id}</td>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td data-table-id-status={`${table.table_id}`}>{table.occupied ? 'Occupied' : 'Free'}</td>
    </tr>
  ))

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
          <tbody>{tableRows}</tbody>
        </table>
      </div>
    </main>
  );
}

export default Dashboard;
