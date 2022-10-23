import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery"
import { previous, today, next } from "../utils/date-time";
import ReservationsList from "../reservations/ReservationsList"
import TablesList from "../tables/TablesList"


/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const URL = process.env.REACT_APP_API_BASE_URL
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const query = useQuery()
  date = query.get("date") || date


  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <div>
        <h1>Dashboard</h1>
        <ErrorAlert error={reservationsError} />
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">Reservations for {date}</h4>
        </div>
      </div>
      <div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => history.push(`/dashboard?date=${today()}`)}
        >
          Today
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => history.push(`/dashboard?date=${next(date)}`)}
        >
          Next
        </button>
      </div>
      <div>
        <ReservationsList reservations={reservations} />
      </div>
    </main>
  );
}

export default Dashboard;
