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
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }
// make buttons change date
// make table to display resevraiton content
  return (
    <main>
      <h1>Dashboard</h1>
    
      <div class="btn-group btn-group-toggle mb-3" data-toggle="buttons">
  <label class="btn btn-info">
    <input type="radio" name="options" id="option1" checked/> Previous
  </label>
  <label class="btn btn-info active">
    <input type="radio" name="options" id="option2"/> Today
  </label>
  <label class="btn btn-info">
    <input type="radio" name="options" id="option3"/> Next
  </label>
</div>
<div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {/* {JSON.stringify(reservations)} */}

      {reservations.map((reservation) => {
        return <h1>{reservation.first_name}</h1>;
      })}
    </main>
  );
}

export default Dashboard;
