import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "../reservations/ReservationsList";
import {next, previous, today} from "../utils/date-time";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
const [date, setDate] = useState(today());
// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const rDate = urlParams.get('rDate');
//    if(rDate){
//     setDate(rDate)
//    } 

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-3">Reservations for date : {date}</h4>
      </div>
       <div className="d-md-flex mb-3"> <button className="btn btn-primary mr-2" onClick={()=>setDate(previous(date))}>
          Previous Day
        </button>
        <button className="btn btn-success mr-2" onClick={()=>setDate(today())}>
          Today
        </button>
        <button className="btn btn-secondary mr-2" onClick={()=>setDate(next(date))}>
          Next Day
        </button>
        </div>
      
      <ErrorAlert error={reservationsError} />
      {/* {JSON.stringify(reservations)} */}
      <ReservationsList reservations={reservations} />
    </main>
  );
}

export default Dashboard;
