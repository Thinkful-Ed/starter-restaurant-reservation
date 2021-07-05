import { previous, today, next } from "../utils/date-time";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"
import ReservationsTable from "./ReservationsTable";
import { listReservations } from "../utils/api";
import TablesTable from "./TablesTable"
import ErrorAlert from "../layout/ErrorAlert";


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




  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError}/>
      <ReservationsTable reservations={reservations}/>
      <TablesTable />
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
