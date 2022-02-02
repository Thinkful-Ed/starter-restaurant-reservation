import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import { today, previous, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsTable from "../layout/Reservations/ReservationsTable";
import TablesTable from "../layout/tables/TablesTable";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(date)
  useEffect(loadReservations, [date,currentDate]);
  useEffect(loadTables, []);
  // console.log(currentDate)
  function loadReservations() {
    const abortController = new AbortController();
    setError(null);
    listReservations({ date:currentDate }, abortController.signal)
      .then(setReservations)
      .catch(setError);
    return () => abortController.abort();
  }
  function loadTables(){
    const AC = new AbortController();
    listTables(AC.signal)
      .then(setTables)
      .catch(setError);
    return () => AC.abort();
  }
  return (
    <main style={{paddingTop:"50px", textAlign:"center"}} >
      <h1 className="my-3" >Dashboard</h1>
      <ErrorAlert error={error} className="my-3"/>
      <div>
      <div className="btn-group" role="group" aria-label="date_selection">
        <button type="button" className="btn btn-secondary" onClick={()=>setCurrentDate(previous(currentDate))}>Previous</button>
        <button type="button" className="btn btn-secondary" onClick={()=>setCurrentDate(today())}>Today</button>
        <button type="button" className="btn btn-secondary" onClick={()=>setCurrentDate(next(currentDate))}>Next</button>
      </div>
        <div className="d-md-flex mb-3" style={{flexDirection:"column", flex:"1"}}>
            <h4 className="my-3">Reservations for {currentDate}</h4>
            <ReservationsTable reservations={reservations}/>
        </div>

        <div className="d-md-flex mb-3" style={{flexDirection:"column"}}>
            <h4 className="my-3">Tables</h4>
            <TablesTable tables={tables}/>
        </div>

      </div>

    </main>
  );
}

export default Dashboard;