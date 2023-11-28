import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, previous, next } from "../utils/date-time";
import { useLocation, useHistory } from "react-router-dom/cjs/react-router-dom";
import ListAllTables from "./ListAllTables";
import ListAllReservations from "./ListAllReservations";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [currDate, setCurrDate] = useState(date);
  const location = useLocation();
  const history = useHistory();
  const dateParam = new URLSearchParams(location.search).get("date");

  useEffect(() => {
    if (dateParam) {
      setCurrDate(dateParam);
    }
  }, [dateParam]);

  useEffect(loadDashboard, [currDate]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date: currDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function buttonHandler(event) {
    switch (event.target.name) {
      case "previous":
        history.push(`/dashboard/?date=${previous(currDate)}`);
        break;
      case "next":
        history.push(`/dashboard/?date=${next(currDate)}`);
        break;
      default:
        history.push(`/dashboard/?date=${today()}`);
        break;
    }
  }

  return (
    <main>
      <h1>Dashboard</h1>
      {/* RESERVATIONS */}
      <div>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">Reservations for {currDate}</h4>
        </div>
        <ErrorAlert error={reservationsError} />

        <ListAllReservations reservations={reservations} />
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
      </div>
      {/* Tables */}
      <ListAllTables />
    </main>
  );
}

export default Dashboard;
