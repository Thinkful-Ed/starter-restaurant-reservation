import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import ReservationsList from "../Reservations/ReservationsList";
import TablesList from "../tables/tablesList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const query = useQuery();
  const queryDate = query.get("date");
  const [dateParam, setDateParam] = useState(queryDate ? queryDate : date);
  const [tables, setTables] = useState([]);

  useEffect(loadDashboard, [dateParam, date]);
  function loadDashboard() {
    const date = queryDate;
    const abortController = new AbortController();
    setReservationsError(null);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setReservationsError);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {dateParam}</h4>
      </div>
      {/* <ErrorAlert error={reservationsError} /> */}
      <ReservationsList reservations={reservations} />
      <TablesList tables={tables}/>
    </main>
  );
}

export default Dashboard;
