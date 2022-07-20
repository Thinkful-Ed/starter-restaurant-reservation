import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, previous, next } from "../utils/date-time";
import { useHistory } from "react-router"



/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

//add default parameter of today()
let presentDay = today()
function Dashboard({ date = presentDay }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  let history = useHistory()

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }


  function getToday(){
    history.push(`/dashboard?date=${presentDay}`)    
  }

  function getYesterday(){
    let yesterday = previous(presentDay)
    history.push(`/dashboard?date=${yesterday}`)    
  }

  function getTomorrow(){
    let tomorrow = next(presentDay)
    history.push(`/dashboard?date=${tomorrow}`)    
  }
  return (
    <main>
     
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>

      </div>
      
      <div>
        <button className="btn btn-secondary" onClick={getYesterday}>Yesterday</button>
        <button className="btn btn-success" onClick={getToday}>Today</button>
        <button className="btn btn-primary" onClick={getTomorrow}>Tomorrow</button>

      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
