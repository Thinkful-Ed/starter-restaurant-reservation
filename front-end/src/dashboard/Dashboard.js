import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import Tables from "../tables/Tables";
import ReservationsList from "../reservations/ReservationsList";
import ErrorAlert from "../layout/ErrorAlert";

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

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);

    listTables(abortController.signal).then(setTables).catch(setTablesError);

    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <ErrorAlert error={reservationsError || tablesError} />
      <ReservationsList date={date} reservations={reservations} />
      <Tables tables={tables} />
    </main>
  );
}

export default Dashboard;
