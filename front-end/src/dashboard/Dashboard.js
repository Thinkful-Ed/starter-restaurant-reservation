import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationCard from "./ReservationCard";
import { next, previous, today } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [dashDate, setDashDate] = useState(date);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      // .then((data)=>console.log(`data`, data))
      .then((data)=> setReservations(data))
      .catch(setReservationsError);
      // .catch(console.log)
    return () => abortController.abort();
  }
  //Event Handlers
  const todayHandler = (e) => {
    window.location.reload(true)
  }
  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {dashDate}</h4>
      </div>
      <Link to={`/dashboard?date=${previous(dashDate)}`}>
        <button onClick={()=> setDashDate(previous(dashDate))}>Previous</button>
      </Link>
      <Link to={`/dashboard`}>
        <button onClick={()=> setDashDate(today())}>Today</button>
      </Link>
      
      <Link to={`/dashboard?date=${next(dashDate)}`}>
        <button onClick={()=> setDashDate(next(dashDate))}>Next</button>
      </Link>
      
      {!reservations ? <ErrorAlert error={reservationsError} /> : (
        <div>
          {reservations.map((reservation)=> {
            if (dashDate === reservation.reservation_date) {
              return <ReservationCard key={reservation.reservation_id} reservation={reservation}/>              
            }
          })}
        </div>
      )}
      
      
    </main>
  );
}

export default Dashboard;
