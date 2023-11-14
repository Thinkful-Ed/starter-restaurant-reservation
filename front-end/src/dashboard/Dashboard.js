import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, previous, next } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  console.log("date", date);
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    console.log("date changed");
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .then(() => console.log(date))
      .then(() => console.log("reservations", reservations))
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function buttonHandler(event) {
    switch (event.target.name) {
      case "previous":
        date = previous(date);
        break;
      case "next":
        date = next(date);
        break;
      default:
        date = today();
        break;
    }
    console.log(date);
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
      <div>
        <button onClick={buttonHandler} name="previous">
          Previous
        </button>
        <button onClick={buttonHandler} name="today">
          Today
        </button>
        <button onClick={buttonHandler} name="next">
          Next
        </button>
      </div>
    </main>
  );
}

export default Dashboard;
