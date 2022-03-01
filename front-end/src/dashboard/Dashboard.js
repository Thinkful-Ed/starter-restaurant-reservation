import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { previous, next, today } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  // Initialize states for reservations and errors
  const [reservations, setReservations] = useState([]);
  const [dashboardError, setDashboardError] = useState([]);

  // If there's a query in the URL, the date is not today and needs to be changed.
  const query = new URLSearchParams(useLocation().search);
  const dateFound = query.get("date");
  if (dateFound) date = dateFound;

  // Every time the date changes, list reservations for that date.
  useEffect(() => {
    const abortController = new AbortController();
    async function loadDashboard() {
      setDashboardError([]);
      listReservations({ date }, abortController.signal)
        .then((res) => {
          setReservations(res);
          if (res.length === 0) setDashboardError([`There are no reservations on ${date}`])
        })
        .catch((err) => {
          setReservations([]);
          setDashboardError([err.message])
        });
    }
    loadDashboard();
    return () => abortController.abort();
  }, [date]);

  return (
    <main>
      <h1 className="d-md-flex justify-content-center">Dashboard</h1>
      <div className="d-md-flex mb-3 justify-content-center">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <div className="d-flex justify-content-center my-3">
        <Link to={`/dashboard?date=${previous(date)}`}><button className="btn btn-dark" type="button"><span className="oi oi-arrow-thick-left" />&nbsp;Previous Day</button></Link>
        <Link to={`/dashboard?date=${today()}`}> <button className="btn btn-dark mx-3" type="button">Today</button></Link>
        <Link to={`/dashboard?date=${next(date)}`}><button className="btn btn-dark" type="button">Next Day&nbsp;<span className="oi oi-arrow-thick-right" /></button></Link>
      </div>
      <ErrorAlert error={dashboardError} />
      { reservations.length > 0 && JSON.stringify(reservations)}
      
    </main>
  );
}

export default Dashboard;
