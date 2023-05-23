import React, { useEffect, useState } from "react";
import { listReservations, cancelReservation, listTables, finishTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { next, previous, today } from "../utils/date-time";
import Reservation from "../reservation/ReservationsList";
import Tables from "../tables/TablesList";
import moment from 'moment'
import '../../src/App.css'

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
  const [tables, setTables] = useState([]);

  useEffect(loadDashboard, [reservationDate]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date: reservationDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    listTables().then(setTables);
    return () => abortController.abort();
  }
  
  function onFinish(table_id, reservation_id) {
    const abortController = new AbortController();
    finishTable(table_id, reservation_id)
      .then(loadDashboard)
    return () => abortController.abort();
  }

  function onCancel(reservation_id) {
    const abortController = new AbortController();
    cancelReservation(reservation_id, abortController.signal)
      .then(loadDashboard)
    return () => abortController.abort();
  }

  const reservationList = (
    <ul>
      {reservations.map((res) => (
        <li style={{ listStyleType: "none" }} key={res.reservation_id}>
          <Reservation onCancel={onCancel} reservation={res} />
        </li>
      ))}
    </ul>
  );

  return (
    <main>
      <ErrorAlert error={reservationsError} />
      <div className="group">
        <div className="item-double">
          <div className="group">
            <div className="item-double">
              <h2>
                  Reservations for {moment(reservationDate).format("dddd MMM DD YYYY")}
              </h2>
            </div>
            <div className="item centered">
              <div className="group-row">
              <button
                className="item black"
                type="button"
                onClick={() => {setReservationDate(previous(reservationDate))}}
                >
                Previous
              </button>
              <button 
                className="item black"
                type="button"
                onClick={() => {
                  setReservationDate(today());
                }}>
                Today
              </button>
              <button
                className="item black"
                type="button"
                onClick={() => setReservationDate(next(reservationDate))}
              >
              Next
              </button>
              </div>
            </div>
          </div>
          <hr></hr>
          <div id="reservations" className="group-col">
            {reservations.length > 0 ? (
              reservationList
            ) : (
              <p>There are currently no reservations for {reservationDate}</p>
            )}
          </div>
        </div>
        <div id="tables" className="item">
            <h2>Tables</h2>
            <hr></hr>
            <Tables onFinish={onFinish} tables={tables} />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;