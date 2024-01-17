import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

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
    const today = new Date().toISOString().split("T")[0];
    const selectedDate = date || today;
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date: selectedDate }, abortController.signal)
    .then(setReservations)
    .catch(setReservationsError);
    return abortController;
  }

  return (
    <main>
      <h1 className="p-4 m-4 text-center">Dashboard</h1>
      <div className="p-4 m-4 flex w-75 mx-auto bg-light">
      <div className="d-md-flex mb-3">
        <h4 className="mb-0 mx-auto">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
        <ul className="list-group">
        {reservations.map((reservation) => (
          <li className="list-group-item w-75 mx-auto" key={reservation.reservation_id}>
            Name: {reservation.first_name} {reservation.last_name} 
            <br />
            Phone Number: {reservation.mobile_number}
            <br />
            Party Size: {reservation.people}
            <br />
            Date: {reservation.reservation_date}
            <br />
            Time: {reservation.reservation_time}
          </li>
        ))}
      </ul>
      <div className="d-flex justify-content-between p-2">
        <button type="submit" className="btn btn-primary">
          Previous
        </button>
        <button className="btn btn-danger">
          Today
        </button>
        <button className="btn btn-danger">
          Next
        </button>
      </div>
      </div>
    </main>
  );
}

export default Dashboard;
