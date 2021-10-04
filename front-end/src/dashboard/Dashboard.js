import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, today, next } from "../utils/date-time"; // these functions will give the day before, the day today, and the next day, respectively.
import { useHistory } from "react-router-dom";
//import NewReservation from "../reservations/NewReservation";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const history = useHistory();
  // console.log("history ===>", history);
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

  const listOfReservations = reservations.map((reservation, index) => {
    return (
      <tr id={reservation.reservation_id} key={index}>
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
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div className="table-responsive">
        <table className="table no-wrap">
          <thead>
            <tr>
              <th className="border-top-0">First Name</th>
              <th className="border-top-0">Last Name</th>
              <th className="border-top-0">Mobile Number</th>
              <th className="border-top-0">Reservation Date</th>
              <th className="border-top-0">Reservation Time</th>
              <th className="border-top-0">People</th>
            </tr>
          </thead>
          <tbody>{listOfReservations}</tbody>
        </table>
      </div>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
      >
        Previous
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => history.push(`/dashboard?date=${today()}`)}
      >
        Today
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => history.push(`/dashboard?date=${next(date)}`)}
      >
        Next
      </button>
    </main>
  );
}

export default Dashboard;
