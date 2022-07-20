import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationDisplay from "../layout/ReservationDisplay";

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

  const seatHandler = () => {
    window.location.reload();
  };

  // make buttons change date
  return (
    <main>
      <h1>Dashboard</h1>

      <div className="btn-group btn-group-toggle mb-3" data-toggle="buttons">
        <label className="btn btn-info">
          <input type="radio" name="options" id="option1" /> Previous
        </label>
        <label className="btn btn-info active">
          <input type="radio" name="options" id="option2" /> Today
        </label>
        <label className="btn btn-info">
          <input type="radio" name="options" id="option3" /> Next
        </label>
      </div>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Reservation Date</th>
            <th scope="col">Reservation Time</th>
            <th scope="col">Guests</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => {
            return <ReservationDisplay reservation={reservation} seatHandler={seatHandler} key={reservation.id} />;
          })}
        </tbody>
      </table>
    </main>
  );
}

export default Dashboard;
