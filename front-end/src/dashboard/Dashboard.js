import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ReservationList from "../reservations/ReservationList";
import TableList from "../tables/TableList";
import { finishReservation, listReservations, listTables } from "../utils/api";
import { next, previous, today } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import "./Dashboard.css";

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
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();

    setLoading(true);

    setReservationsError(null);

    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError)
      .finally(() => {
        setLoading(false);
      });

    return () => abortController.abort();
  }

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  const handlePrevious = () => {
    const previousDate = previous(date);
    history.push(`/dashboard?date=${previousDate}`);
  };

  const handleToday = () => {
    const todayDate = today();
    history.push(`/dashboard?date=${todayDate}`);
  };

  const handleNext = () => {
    const nextDate = next(date);
    history.push(`/dashboard?date=${nextDate}`);
  };

  const handleFinish = async (table_id) => {
    const abortController = new AbortController();
    const confirm = window.confirm(
      "Is this table ready to seat new guests?\nThis cannot be undone."
    );
    if (confirm) {
      try {
        await finishReservation(table_id, abortController.signal);
        loadDashboard();
        loadTables();
      } catch (error) {
        console.log(error);
      }
    }
    return () => abortController.abort();
  };

  return (
    <main className="container m-5 mx-auto">
      <h2 className="mb-5 text-center">Dashboard</h2>
      <section className="mb-4">
        <div className="d-md-flex justify-content-between align-items-center">
          <h4 className="mb-0">Reservations for {date}</h4>
          <div className="mb-md-0">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm m-1"
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              type="button"
              className="btn btn-info btn-sm m-1"
              onClick={handleToday}
            >
              Today
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm m-1"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
        <ErrorAlert error={reservationsError} />
        <ReservationList
          reservations={reservations}
          loadDashboard={loadDashboard}
        />
      </section>
      <section>
        <h4 className="mb-lg-0">Tables</h4>
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <>
            <ErrorAlert error={tablesError} />
            <TableList tables={tables} handleFinish={handleFinish} />
          </>
        )}
      </section>
    </main>
  );
}

export default Dashboard;
