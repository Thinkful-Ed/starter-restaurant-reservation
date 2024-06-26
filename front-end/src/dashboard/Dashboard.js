import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, previous, next } from "../utils/date-time";
import DateButtons from "./DateButtons";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {

  const [reservations, setReservations] = useState(null);
  const [reservationsError, setReservationsError] = useState([]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
      listReservations({ date }, abortController.signal)
      .then(setReservations)
      // .catch(setReservationsError);
      .catch((reservationsError) => {console.log("Dashboard - reservationsError: ", reservationsError);
                                     setReservationsError(reservationsError)});
    return () => abortController.abort();
  }
  
  
  useEffect(loadDashboard, [date]);

  const tableRows = reservations.length ? (
    reservations.map((reservation) => (
      <tr key={reservation.reservation_id}>
        <th scope="row">{reservation.reservation_id}</th>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{reservation.reservation_date}</td>
        <td>{reservation.reservation_time}</td>
        <td>{reservation.people}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="7" className="text-center">
        No reservations for this date.
      </td>
    </tr>
  );


  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date {date}</h4>
      </div>
      <DateButtons
            previous={`/dashboard?date=${previous(date)}`}
            today={`/dashboard?date=${today()}`}
            next={`/dashboard?date=${next(date)}`} />
      <ErrorAlert errors={reservationsError} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Reservation Date</th>
            <th scope="col">Reservation Time</th>
            <th scope="col">People</th>
          </tr>
        </thead>
        <tbody>
           {tableRows}
        </tbody>
      </table>
    </main>
  );
}

export default Dashboard;