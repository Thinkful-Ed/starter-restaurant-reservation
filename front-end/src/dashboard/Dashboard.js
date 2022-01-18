import React, { useEffect, useState } from "react";
import {useHistory} from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import {formatAsTime, formatAsDate, previous, next} from "../utils/date-time";
import useQuery from "../utils/useQuery";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  let isToday = true;
  const query = useQuery();
  const getDate = query.get("date");

  if (getDate) {
    date = getDate;
    isToday = false;
  }
  
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
  
  const displayDate = formatAsDate(date);

  const history = useHistory();

  const previousDate = previous(date);
  const nextDate = next(date);

  function pushDate(dateToMove) {
    history.push(`/dashboard?date=${dateToMove}`)
  }
  
  const display = reservations.map(reservation => {
    return (
      
    <tr key={reservation.reservation_id}>
      <td>{reservation.reservation_id}</td>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{formatAsTime(reservation.reservation_time)}</td>
      <td>{reservation.people}</td>
      {/* {isToday && } */}
    </tr>
    )
  })


  
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {displayDate}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div className="btn-group" role="group" aria-label="Pick a date">
        <button onClick={() => pushDate(previousDate)}>Back</button>
        <button onClick={() => history.push("/dashboard")}>Today</button>
        <button onClick={() => pushDate(nextDate)}>Forward</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Mobile number</th>
            <th scope="col">Reservation time</th>
            <th scope="col">Party size</th>
          </tr>
        </thead>
      {reservations.length > 0 && display}

      </table>
      {!reservations.length && <h3>No reservations on this date</h3>}
    </main>
  );
}

export default Dashboard;
