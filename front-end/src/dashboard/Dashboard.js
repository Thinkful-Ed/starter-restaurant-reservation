import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

//additional hook is needed to get query param from url
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Dashboard({ date }) {
  //overide date with query param if "date" is present
  let location = useQuery().get("date");
  if (location) date = location;
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
