import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import { previous, next } from "../utils/date-time";
import { today } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";

import ReservationsTable from "./ReservationsTable";
import TablesTable from "./TablesTable";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const history = useHistory();
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [tableUnassigned, setTableUnassigned] = useState(false);
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null);
  const { search } = useLocation();
  const newDate = new URLSearchParams(search).get("date");

  if (search) date = newDate;

  useEffect(loadDashboard, [date, tableUnassigned]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    setReservationsError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  const handlePrevious = () => {
    history.push(`/dashboard?date=${previous(date)}`);
  };

  const handleToday = () => {
    history.push(`/dashboard?date=${today()}`);
  };

  const handleNext = () => {
    history.push(`/dashboard?date=${next(date)}`);
  };

  const reservationsList = reservations.map((res, index) => (
    <li key={index}>
      <ReservationsTable reservation={res} />
    </li>
  ));
  const tablesList = tables.map((table, index) => (
    <li key={index}>
      <TablesTable
        table={table}
        reloadVal={tableUnassigned}
        reload={setTableUnassigned}
      />
    </li>
  ));

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
        <ErrorAlert error={reservationsError} />
        <div className="mt-3">
          <button className="btn btn-secondary mr-2" onClick={handlePrevious}>
            Previous
          </button>
          <button className="btn btn-primary mr-2" onClick={handleToday}>
            Today
          </button>
          <button className="btn btn-secondary" onClick={handleNext}>
            Next
          </button>
        </div>
        <ul>{reservationsList}</ul>
      </div>
      <div>
        <h4 className="mb-0">Tables</h4>
        <ErrorAlert error={tablesError} />
        <ul>{tablesList}</ul>
        <div className="mt-3"></div>
      </div>
    </main>
  );
}

export default Dashboard;
