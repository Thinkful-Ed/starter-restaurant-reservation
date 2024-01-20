import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ReservationList from "../reservations/ReservationList";
import TableList from "../tables/TableList";
import { finishReservation, listReservations, listTables } from "../utils/api";
import { next, previous, today } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";

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

  const history = useHistory();

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
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
    <main>
      <h1 className="p-4 m-4 text-center">Dashboard</h1>
      <div className="align-items-center pt-3 border bg-light">
        <div className="d-md-flex mb-3">
          <h4 className="mb-0 mx-auto text-center">Reservations for {date}</h4>
        </div>
        <ErrorAlert error={reservationsError} />
        <ReservationList
          reservations={reservations}
        />
      </div>
      <div className="d-flex justify-content-between p-2">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn btn-outline-info"
          onClick={handleToday}
        >
          Today
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
      <div className="align-items-center mt-5 mb-5 border bg-light">
      <div className="d-md-flex mb-3">
        <h4 className="mb-0 pt-3 mx-auto text-center">Tables</h4>
      </div>
        <TableList tables={tables} handleFinish={handleFinish} />
        <ErrorAlert error={tablesError} />
      </div>
    </main>
  );
}

export default Dashboard;
