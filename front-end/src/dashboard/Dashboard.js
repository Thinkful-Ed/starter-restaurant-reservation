import { previous, today, next } from "../utils/date-time";
import { useHistory } from "react-router-dom"
import ReservationsTable from "./ReservationsTable";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {

const history = useHistory();



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
      <ReservationsTable date={date}/>
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
