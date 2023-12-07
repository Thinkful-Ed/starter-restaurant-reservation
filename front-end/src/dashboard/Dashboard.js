import React, { useEffect, useState } from "react";
import {
  useLocation,
  Link
} from "react-router-dom/cjs/react-router-dom.min";
import { listReservationsByDate, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationView from "./ReservationView";
import TableView from "./TableView";
import { next, previous } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null);
  const [currentDate, setCurrentDate] = useState(date);
  // date = currentDate;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryDate = searchParams.get("date");

  useEffect(() => {
    if (queryDate && queryDate !== currentDate) {
      setCurrentDate(queryDate);
    }
  }, [queryDate, currentDate]);

  useEffect(loadDashboard, [currentDate]);


  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservationsByDate(currentDate, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  useEffect(() => {
    const abortController = new AbortController();

    // Load tables only once
    setTablesError(null);
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError);

    return () => abortController.abort();
  }, []);

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
        <div>
          <Link to={`/dashboard?date=${previous(currentDate)}`} className="btn btn-info">Previous Day</Link>
          <Link to={`/dashboard?date=${next(currentDate)}`} className="btn btn-info">Next Day</Link>
        </div>
      </div>
      {reservations.map((reservation) => <ReservationView key={reservation.reservation_id} reservation={reservation} date={date} setReservations={setReservations} />)}

      <div>
      <h4 className="mb-0">Tables</h4>
        {tables.map((table)=> <TableView key={table.table_id} table={table} setTables={setTables} setReservations={setReservations} date={date} />)}
      </div>

      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />
    </main>
  );
}

export default Dashboard;
