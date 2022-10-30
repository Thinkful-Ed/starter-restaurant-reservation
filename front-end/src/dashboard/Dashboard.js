import React, { useEffect, useState } from "react";
import useQuery from "../utils/useQuery"
import { listReservations, listTables } from "../utils/api";
import { today, previous, next } from "../utils/date-time"
import ReservationsList from "../reservations/ReservationsList"
import TablesList from "../tables/TablesList"
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date }) {
  const history = useHistory()
  const query = useQuery()
  date = query.get("date") || date
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([])
  const [tablesError, setTablesError] = useState(null)

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal).then(setTables).catch(setTablesError)
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
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
          >
            Previous Date
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => history.push(`/dashboard?date=${today()}`)}
          >
            Current Date 
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => history.push(`/dashboard?date=${next(date)}`)}
          >
            Next Date
          </button>
        </div>
        <div>
          <ReservationsList reservations={reservations} />
        </div>
        <ErrorAlert error={tablesError} />
        <div>
          <h4>Tables</h4>
        </div>
        <div>
          <TablesList tables={tables} />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;