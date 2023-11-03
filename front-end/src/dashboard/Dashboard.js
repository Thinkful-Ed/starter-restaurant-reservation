import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import { previous, today, next } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import ListReservations from "./ListReservations";
import ListTables from "./ListTables";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const [dateOfReservations, setDateOfReservations] = useState(date);

  const { search } = useLocation();
  const searchDate = queryString.parse(search).date;
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadTables, []);
  useEffect(loadDashboard, [search, dateOfReservations, date, searchDate]);
  useEffect(resetDate, [search, date]);

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);

    return () => abortController.abort();
  }

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);

    if (searchDate) {
      setDateOfReservations(searchDate.slice(0, 10));
      listReservations({ date: searchDate }, abortController.signal)
        .then(setReservations)
        .catch(setReservationsError);
    } else {
      setDateOfReservations(date);
      listReservations({ date }, abortController.signal)
        .then(setReservations)
        .catch(setReservationsError);
    }
    return () => abortController.abort();
  }

  function resetDate() {
    if (search) return;
    const abortController = new AbortController();
    setDateOfReservations(date);
    return () => abortController.abort();
  }

  return (
    <>
      <div className="container p-3 my-2 bg-secondary text-white">
        <div className="row justify-content-center">
          <div className="col-5.5 border border-primary p-3 mb-2 bg-dark text-white">
            <h1 className="m-3 pl-3">Reservations Dashboard</h1>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-1.5">
            <button
              id="today"
              type="today"
              className="btn btn-outline-primary btn m-2"
            >
              <Link to={`/dashboard?date=${previous(dateOfReservations)}`}>
                Previous
              </Link>
            </button>
          </div>
          <div className="col-1.5">
            <button
              id="today"
              type="today"
              className="btn btn-outline-primary btn m-2"
            >
              <Link to={`/dashboard?date=${today()}`}>Today</Link>
            </button>
          </div>
          <div className="col-1.5">
            <button
              id="next"
              type="next"
              className="btn btn-outline-primary btn m-2"
            >
              <Link to={`/dashboard?date=${next(dateOfReservations)}`}>
                Next
              </Link>
            </button>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-2.5">
            <h4 className="m-3">{dateOfReservations}</h4>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-3">
            <input
              type="date"
              className="form-control"
              name="reservation_date"
              id="reservation_date"
              placeholder="Date of Reservation"
            />
          </div>
        </div>
      </div>
      <ErrorAlert error={tablesError} />
      <ErrorAlert error={reservationsError} />
      <div className="container p-3 my-2">
        <ListReservations
          reservations={reservations}
          loadDashboard={loadDashboard}
        />
        <ListTables
          tables={tables}
          loadDashboard={loadDashboard}
          loadTables={loadTables}
        />
      </div>
    </>
  );
}

export default Dashboard;
