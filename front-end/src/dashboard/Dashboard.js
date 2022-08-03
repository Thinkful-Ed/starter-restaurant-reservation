import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next } from "../utils/date-time"
import { Link } from "react-router-dom";
import TableList from "../Table/TableList"
import ReservationList from "../Create/ReservationList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);


  useEffect(loadDashboard, [date]);

  function loadDashboard() {

    // const dateThatIsOnPage = date;
    // const previousDate = previous(dateThatIsOnPage);
    // console.log("dateThatIsOnPage", dateThatIsOnPage)
    // console.log("previousDate", previousDate)

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
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <div>
        <Link to={`/dashboard?date=${previous(date)}`}><button>Previous</button></Link>
        <Link to ={`/dashboard`}><button>Today</button></Link>
        <Link to ={`/dashboard?date=${next(date)}`}><button>Next</button></Link>
      </div>
      <ErrorAlert error={reservationsError} />
      <ReservationList reservations={reservations}/>
      <TableList/>
    </main>
  );
}

export default Dashboard;
