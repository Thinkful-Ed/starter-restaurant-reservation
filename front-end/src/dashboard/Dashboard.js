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
  //State variables
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [dashDate, setDashDate] = useState(date);
  const [tables, setTables] = useState(null)

  useEffect(loadDashboard, [date]);
  useEffect(()=> {
    async function getTables() {
      try {
        const response = await fetch(
        'http://localhost:5001/tables',
        {
          method: "GET",
          body: JSON.stringify(),
          headers : {
            "Content-type": "application/json;charset=UTF-8"
          }
        }
      );
      const tables = await response.json();
      setTables(tables)
      } catch (error) {
        console.error("Error: ", error)
      }
    }
    getTables()
  },[])
  /**
   * REMINDER TO SELF:
   * -----------------
   * ALREADY FETCHED ALL TABLE DATA!!
   * JUST NEED TO RENDER TABLE DATA ONTO THE DASHBOARD
   * PICK UP ON USER STORY 04 - #2
   */
  console.log(tables)
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then((data)=> setReservations(data))
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  //Event Handlers
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
            } else {
              return ""
            }
          })}
        </div>
      )}
      
    </main>
  );
}

export default Dashboard;
