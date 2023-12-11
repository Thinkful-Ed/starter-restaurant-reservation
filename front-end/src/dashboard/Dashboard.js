import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, previous, next } from "../utils/date-time";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import ListAllTables from "./ListAllTables";
import ListAllReservations from "./ListAllReservations";
import useQuery from "../utils/useQuery";

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
  const history = useHistory();
  const query = useQuery();
  const dateParam = query.get("date");

  //updates the curr date if the date param changes
  useEffect(() => {
    if (dateParam) {
      setCurrDate(dateParam);
    }
  }, [dateParam]);

  //reloads the dashboard page if the currDate changes
  useEffect(loadDashboard, [currDate]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date: currDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  //enters a new dateparam into the dashboard url depending on if they previous, today, or next day buttons
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
      <div>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">Reservations for {currDate}</h4>
        </div>
        <ErrorAlert error={reservationsError} />
        <ListAllReservations reservations={reservations} />
        <div className="btn-group">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={buttonHandler}
            name="previous"
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={buttonHandler}
            name="today"
          >
            Today
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={buttonHandler}
            name="next"
          >
            Next
          </button>
        </div>
      </div>
      <br></br>
      <ListAllTables />
    </main>
  );
}

export default Dashboard;
