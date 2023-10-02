import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import {previous, next} from "../utils/date-time"
import Reservation from "../reservation/Reservation";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, setDate }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([])
  const [tablesError, setTablesError] = useState(null)

  useEffect(()=>{
    async function loadDashboard() {
      const abortController = new AbortController();
      setReservationsError(null);
      await listReservations({date}, abortController.signal)
        .then(setReservations)
        .catch(setReservationsError);
      await listTables(abortController.signal)
             .then(setTables)
             .catch(setTablesError)
      return () => abortController.abort();
    }
    loadDashboard()
  },[date]);

const previousHandler = () =>{
  setDate(previous(date))
}
const nextHandler = () =>{
  setDate(next(date))
}



  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date {date}</h4>
      </div>
      <h2>Reservations</h2>
      <button onClick={previousHandler}>Previous</button>
      <button onClick={nextHandler}>Next</button>
      <ErrorAlert error={reservationsError} />
      {reservations && reservations.map(r=><Reservation key={r.reservation_id} reservation={r} />)}
      <h3>Tables</h3>
      <ErrorAlert error={tablesError} />
      
      {tables && tables.map(t=><div key={t.table_name}>{t.table_name}</div>)}
    </main>
  );
}

export default Dashboard;
