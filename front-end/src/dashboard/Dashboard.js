import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import TableResDetails from "./TableResDetails";
import { previous, today, next } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  //history creates object
  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const previousClickHandler = () => {
    history.push(`/dashboard?date=${previous(date)}`);
  };
  const todayClickHandler = () => {
    history.push(`/dashboard?date=${today()}`);
  };
  //when next is clicked, re-render page with nextDate
  //history.push(string dashboar?date = template literal for function(date))
  //history will rerender page
  const nextClickHandler = () => {
    history.push(`/dashboard?date=${next(date)}`);
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <div className="btn-gorup">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={previousClickHandler}
        >
          {String.fromCharCode(8592)} Previous
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={todayClickHandler}
        >
          Today
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={nextClickHandler}
        >
          Next {String.fromCharCode(8594)}
        </button>
      </div>
      <div className="TableResDetails">
        <TableResDetails
          reservations={reservations}
          date={date}
          // previousDate={previousDate}
          // nextDate={nextDate}
        />
      </div>
      <ErrorAlert error={reservationsError} />
      {/* {JSON.stringify(reservations)} */}
    </main>
  );
}

export default Dashboard;
