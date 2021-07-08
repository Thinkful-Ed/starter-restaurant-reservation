import { previous, today, next } from "../utils/date-time";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import ReservationsTable from "./ReservationsTable";
import { listReservations } from "../utils/api";
import TablesTable from "./TablesTable"
import ErrorAlert from "../layout/ErrorAlert";
import "./Dashboard.css";

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

useEffect(loadReservations, [date]);


function loadReservations() {
  const abortController = new AbortController();
  setReservationsError(null);
  listReservations({ date }, abortController.signal)
    .then(setReservations)
    .catch(setReservationsError);
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




  return (
    <main>
      
      <div className="banner">
      <h1>Dashboard</h1>
      <hr></hr>
  <div className="row buttons">
    <div className="col-md mt-2">
    <button type="button" className="btn btn-dashboard" onClick={previousDate}>Previous</button>
    </div>
    <div className="col-md mt-2">
    <button type="button" className="btn btn-dashboard" onClick={todayDate}>Today</button>
    </div>
    <div className="col-md mt-2">
    <button type="button" className="btn btn-dashboard" onClick={nextDate}>Next</button>
    </div>
  </div>
  <div className="dashboard-tables">
        <h4 className="reservations-header">Reservations for {date}</h4>
      <ErrorAlert error={reservationsError}/>
      <ReservationsTable reservations={reservations}/>
      <h4 className="tables-header">Tables</h4>
      <TablesTable />
      </div>
      </div>
    </main>
  )
}

export default Dashboard;
