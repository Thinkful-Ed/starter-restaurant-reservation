import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { previous, today, next } from "../utils/date-time";
import { useHistory } from "react-router-dom"
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {

const history = useHistory();

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

  function previousDate() {
    date = previous(date)
    history.push("/dashboard?date=" + date);
  }

  function todayDate() {
    date = today(date)
    history.push("/dashboard?date=" + date)
  }

  function nextDate() {
    date = next(date)
    history.push("/dashboard?date=" + date)
  }

  function cards(reservations) {


    return (
      <div className="row g-2">
        <table className="table table-dark">
  <thead>
    <tr>
      <th scope="col">Last Name</th>
      <th scope="col">First Name</th>
      <th scope="col">Mobile Number</th>
      <th scope="col">Time</th>
      <th scope="col">Party Of</th>

    </tr>
  </thead>
  <tbody>
  {reservations.filter(({ reservation_date }) => reservation_date === date).map(({reservation_id, first_name, last_name, mobile_number, reservation_time, people}) => (
            <tr key={reservation_id}>
            <td>{last_name}</td>
            <td>{first_name}</td>
            <td>{mobile_number}</td>
            <td>{reservation_time}</td>
            <td>{people}</td>
          </tr>
    ))}
  </tbody>
</table>

      </div> 
    )
  }




  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
        <ErrorAlert error={reservationsError} />
      </div>
      {cards(reservations)}
      <div className="container">
  <div className="row mt-5">
    <div className="col-md mt-2">
    <button type="button" className="btn btn-outline-dark" onClick={previousDate}>Previous</button>
    </div>
    <div className="col-md mt-2">
    <button type="button" className="btn btn-outline-dark" onClick={todayDate}>Today</button>
    </div>
    <div className="col-md mt-2">
    <button type="button" className="btn btn-outline-dark" onClick={nextDate}>Next</button>
    </div>
  </div>
</div>
    </main>
  )
}

export default Dashboard;
