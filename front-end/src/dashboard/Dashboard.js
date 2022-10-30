import React, { useEffect, useState } from "react";
import { useHistory } from "react-router"
import useQuery from "../utils/useQuery"
import { listReservations, listTables } from "../utils/api";
import { today, previous, next, getDisplayDate } from "../utils/date-time"
import ReservationsList from "../reservations/ReservationsList"
import TablesList from "../tables/TablesList"
import ErrorAlert from "../layout/ErrorAlert";


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
  const displayDate = getDisplayDate(date)

  useEffect(loadDashboard, [date, displayDate.display]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(
        setReservationsError(
          <div className="alert alert-info border border-info my-2">
            No Reservations on {displayDate.display}
          </div>
        ));
    listTables(abortController.signal).then(setTables).catch(setTablesError)
    return () => abortController.abort();
  }

  return (
    <main>
      <div>
        <h1 className="mb-4">Dashboard</h1>

        {/* Date Manipulation Section */}
        <div className="d-md-flex mb-3">
          <h3 className="mb-0">{displayDate.display}</h3>
        </div>
        <div className="input-group input-group-sm mb-2">
          <div className="d-flex d-md-inline btn-group input-group-prepend">
            <button
              type="button"
              className="btn btn-info btn-sm mt-2 mb-2 mr-2"
              onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
            >
              <span className="oi oi-chevron-left mr-2" />
              Previous Date
            </button>
            <button
              type="button"
              className="btn btn-info btn-sm mt-2 mb-2 mr-2"
              onClick={() => history.push(`/dashboard?date=${today()}`)}
            >
              <span className="oi oi-calendar mr-2" />
              Current Date 
            </button>
            <button
              type="button"
              className="btn btn-info btn-sm mt-2 mb-2 mr-2"
              onClick={() => history.push(`/dashboard?date=${next(date)}`)}
            >
              Next Date
              <span className="oi oi-chevron-right ml-2" />
            </button>
          </div>
          <input
            type="date"
            className="form-control mt-2 mb-2"
            style={{ maxwidth: "150px", minWidth: "110px" }}
            onChange={(event) =>
              history.push(`/dashboard?date=${event.target.value}`)
            }
            value={date}
          />
        </div>

        {/*Reservations display */}
        <div>
          <h4 className="mt-3">Reservations</h4>
        </div>
        <div>{!reservations.length && reservationsError}</div>
        <div>
          {reservations.length > 0 && (
            <ReservationsList reservations={reservations} />
          )}
        </div>

        {/*Tables display */}
        <ErrorAlert error={tablesError} />
        <div>
          <h4 className="mt-4">Tables</h4>
        </div>
        <div>
          <TablesList tables={tables} />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;