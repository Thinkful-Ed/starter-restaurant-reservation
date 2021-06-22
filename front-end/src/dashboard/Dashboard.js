import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, today, next } from "../utils/date-time";
import { useHistory } from "react-router-dom"

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
    //filter reservations by date
    
    //sort reservations ascending by time

    return (
      <div className="row g-2">
      {reservations.filter(({ reservation_date }) => reservation_date === date).map(({reservation_id, first_name, last_name, mobile_number, reservation_date, reservation_time, people}) => (
       <div className="col-md" key = {reservation_id}>
        <div className="card" style={{width: "18rem"}}>
        <div className="card-body">
          <h5 className="card-title">{reservation_time}</h5>
          <h4 className="card-text">{last_name}, {first_name}</h4>
          <h6 className="card-text">Party of {people}</h6>
          <h6 className="card-text">{mobile_number}</h6>
          <p className="card-text">{reservation_date}</p>
        </div>
      </div>
      </div>
    ))}
      </div> 
    )
  }




  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
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
