import React, { useEffect, useState } from "react";
import { listReservations, finishTable, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import { today, previous, next } from "../utils/date-time";
import { Link } from "react-router-dom";
import ReservationList from "../reservations/ReservationList";
import TablesList from "../tables/TablesList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ error, setError }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  let date = useQuery().get("date");

  if (!date) {
    date = today();
  }

  async function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null);

    try {
      const [reservationData, tablesData] = await Promise.all([
        listReservations({ date }, abortController.signal),
        listTables(abortController.signal)
      ]);

      setReservations(reservationData);
      setTables(tablesData);
    } catch (error) {
      setReservationsError(error);
      setTablesError(error);
    }

    return () => abortController.abort();
  }

  useEffect(() => {
    loadDashboard();
  }, [date]);

  async function handleClick(e, table_id) {
    e.preventDefault();
    setTablesError(null);

    const confirmation = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );

    if (confirmation) {
      const abortController = new AbortController();
      try {
        await finishTable(table_id, abortController.signal);
        await loadDashboard();
      } catch (error) {
        console.error(error);
        setTablesError(error);
      }
      abortController.abort();
    }
  }


  console.log(reservations);

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
            {" "}
            {/* Container for buttons */}
            <Link
              to={`dashboard?date=${previous(date)}`}
              className="btn btn-primary mr-2"
            >
              Previous Day
            </Link>
            <Link to={`dashboard`} className="btn btn-primary mr-2">
              Today
            </Link>
            <Link
              to={`dashboard?date=${next(date)}`}
              className="btn btn-primary mr-2"
            >
              Next Day
            </Link>
          </div>
        </div>
      </div>
      <div></div>
      <div className="mt-3">
        <ReservationList
          reservations={reservations}
          loadDashboard={loadDashboard}
          setError={setError}
          error={error}
        />
      </div>
      <div>
        <TablesList tables={tables} tablesError={tablesError} handleClick={handleClick}/>
      </div>
    </main>
  );
}

export default Dashboard;
