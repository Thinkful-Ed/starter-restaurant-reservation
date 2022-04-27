import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Buttons from "./Buttons";
import Reservations from "./Reservations";
import Tables from "./Tables";

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

  useEffect(loadDashboard, [date]);
  useEffect(loadTables, []);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  const allFinishedReservations = reservations.filter(
    (reservation) =>
      reservation.status === "finished" || reservation.status === "cancelled"
  );

  return (
    <main className=".bg-secondary">
      <h1 className="d-flex justify-content-center">Reservations</h1>
      <div className="d-flex justify-content-center mb-3">
        <h4 className="mb-0">Date: {date}</h4>
      </div>
      <Buttons date={date} />
      <ErrorAlert error={reservationsError} />
      {allFinishedReservations.length === reservations.length &&
        reservations.length > 0 && (
          <h3 className="my-3 d-flex justify-content-center">
            No reservations for this date.
          </h3>
        )}
      {reservations.length > 0 ? (
        <Reservations reservations={reservations} />
      ) : (
        <h3 className="my-3 d-flex justify-content-center">
          No reservations for this date.
        </h3>
      )}
      <hr></hr>
      <h1 className="d-flex justify-content-center">Tables</h1>
      <Tables tables={tables} date={date} />
      <ErrorAlert error={tablesError} />
    </main>
  );
}

export default Dashboard;
