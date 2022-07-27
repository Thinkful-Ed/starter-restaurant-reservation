import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, previous, next } from "../utils/date-time";
import { useHistory } from "react-router"
import ReservationDisplay from "../layout/ReservationDisplay"
import TableDisplay from "../layout/TableDisplay";



/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

//add default parameter of today()

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([])
  const [tablesError, setTablesError] = useState(null)
  let history = useHistory()

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
      console.log("reservations: ", reservations)
      
    listTables({ date }, abortController.signal) //do I need to destructure date here?
      .then(setTables)
      .catch(setTablesError)
      console.log("tables: ", tables)
    return () => abortController.abort();
  }


  function getToday(){
    history.push(`/dashboard`)    
  }

  function getYesterday(){
    let yesterday = previous(date)
    history.push(`/dashboard?date=${yesterday}`)    
  }

  function getTomorrow(){
    let tomorrow = next(date)
    history.push(`/dashboard?date=${tomorrow}`)    
  }

  // console.log(typeof reservations)
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
      
      <div className="p-3 mb-2 bg-light text-dark">
        {/* {JSON.stringify(reservations, null, "\n")} */}
        
        {/* {reservations.map((reservation)=>{
          return <li>{reservation}</li>

        })} */}
        {reservations.map((reservation)=>{
          return <ReservationDisplay reservation={reservation} />
        })}
        
      </div>

      <div className="p-3 mb-2 bg-light text-dark">
        {/* {JSON.stringify(tables, null, "\n")} */}
        
        {/* {reservations.map((reservation)=>{
          return <li>{reservation}</li>

        })} */}
        {tables.map((table)=>{
          return <TableDisplay table={table} />
        })}
        
      </div>

    </main>
  );
}

export default Dashboard;
