import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import {previous, next, today} from "../utils/date-time"
import useQuery from "../utils/useQuery";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const queryDate = useQuery().get("date");
  if(queryDate){
    date = queryDate
  }

  useEffect(loadDashboard, [date]);

function loadDashboard() {
  setReservations("Loading...")
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
        <h4 className="mb-0">Reservations for date {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
      <div>
        <button type="button" onClick={() =>{previous(date)}} className="btn btn-primary btn-arrow-left">Previous</button>
        <button type="button" onClick={() =>{today()}} className="btn btn-primary btn-arrow-left">Today</button>
        <button type="button" onClick={() =>{next(date)}} className="btn btn-primary btn-arrow-right">Next</button>
      </div>
    </main>
  );
}

export default Dashboard;
