import React, { useEffect, useState } from "react";
import { listReservations, finishTable, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import { today, previous, next } from "../utils/date-time";
import { Link } from "react-router-dom";
import ReservationList from "../reservations/ReservationList";
import TablesList from "../tables/TablesList";

function Dashboard({ error, setError }) {
  // State for reservations, reservations error, tables, and tables error
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  // Get the date from the query parameter or default to today's date
  let date = useQuery().get("date");
  if (!date) {
    date = today();
  }

  // Load reservations and tables when the component mounts or date changes
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null);

    async function load() {
      try {
        // Fetch reservations and tables data
        const [reservationData, tablesData] = await Promise.all([
          listReservations({ date }, abortController.signal),
          listTables(abortController.signal)
        ]);

        // Update state with fetched data
        setReservations(reservationData);
        setTables(tablesData);
      } catch (error) {
        // Handle errors
        setReservationsError(error);
        setTablesError(error);
      }
    }

    // Call the load function and return an abort function
    load();
    return () => abortController.abort();
  }

  useEffect(loadDashboard, [date]);

  // Handle clicking on a table to mark it as ready
  async function handleClick(e, table_id) {
    e.preventDefault();
    setTablesError(null);

    const confirmation = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );

    if (confirmation) {
      const abortController = new AbortController();
      try {
        // Call API to mark the table as finished and update the dashboard
        await finishTable(table_id, abortController.signal);
        await loadDashboard();
      } catch (error) {
        console.error(error);
        setTablesError(error);
      }
      // Abort the controller to avoid memory leaks
      abortController.abort();
    }
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for: {date} </h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div className="row justify-content-center">
        <div className="col">
          <div className="d-flex justify-content-center">
            {/* Links to navigate to previous, today, and next days */}
            <Link
              to={`dashboard?date=${previous(date)}`}
              className="btn btn-primary mr-2 mb-2"
            >
              Previous Day
            </Link>
            <Link to={`dashboard`} className="btn btn-primary mr-2 mb-2">
              Today
            </Link>
            <Link
              to={`dashboard?date=${next(date)}`}
              className="btn btn-primary mr-2 mb-2"
            >
              Next Day
            </Link>
          </div>
        </div>
      </div>
      {/* Render the ReservationList component */}
      <ReservationList
        reservations={reservations}
        loadDashboard={loadDashboard}
        setError={setError}
        error={error}
      />
      {/* Render the TablesList component */}
      <TablesList tables={tables} tablesError={tablesError} handleClick={handleClick} />
    </main>
  );
}

export default Dashboard;
