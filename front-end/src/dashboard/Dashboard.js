import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import TableResDetails from "./Reservations/TableResDetails";
import { previous, today, next } from "../utils/date-time";
import TableList from "./Tables/TableList";
import "../layout/Layout.css";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    listTables(abortController.signal).then(setTables).catch(setTablesError);
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
      <div className="title">
        <h1>Dashboard</h1>
      </div>
      <div className="d-md-flex mb-3 subheading">
        <h2 className="mb-0">Reservations for {date}</h2>
      </div>
      <div className="btn-group">
        <button
          style={{ backgroundColor: "#d0db97" }}
          type="button"
          className="btn btn-text"
          onClick={previousClickHandler}
        >
          {String.fromCharCode(8592)} Previous
        </button>
        <button
          style={{ backgroundColor: "#d0db97" }}
          type="button"
          className="btn btn-text"
          onClick={todayClickHandler}
        >
          Today
        </button>
        <button
          style={{ backgroundColor: "#d0db97" }}
          type="button"
          className="btn btn-text"
          onClick={nextClickHandler}
        >
          Next {String.fromCharCode(8594)}
        </button>
      </div>
      <br />
      <div className="table-and-reservation-containers">
        <div className="reservation-list-container">
          <TableResDetails
            reservations={reservations}
            date={date}
            loadDashboard={loadDashboard}
          />
        </div>
        <br />
        <div className="table-list-container">
          <TableList tables={tables} loadDashboard={loadDashboard} />
        </div>
      </div>

      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
      {/* {JSON.stringify(reservations)} */}
    </main>
  );
}

export default Dashboard;
