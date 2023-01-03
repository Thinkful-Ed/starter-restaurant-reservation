import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, previous, next } from "../utils/date-time";
import { useHistory } from "react-router-dom";
import TablesSection from "./TablesSection";
import ReservationsList from "../reservations/ReservationsList";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
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

  function handleTodayButtonClick() {
    history.push(`/dashboard?date=${today()}`);
  }

  function handlePreviousButtonClick() {
    history.push(`/dashboard?date=${previous(date)}`);
  }

  function handleNextButtonClick() {
    history.push(`/dashboard?date=${next(date)}`);
  }

  return (
    <main>
      <h1>Dashboard</h1>

      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for &nbsp;</h4>

        <h4> {date} </h4>
      </div>
      <button
        onClick={handlePreviousButtonClick}
        className="btn btn-primary mr-1">
        Previous Date
      </button>
      <button onClick={handleTodayButtonClick} className="btn btn-primary mr-1">
        Today
      </button>
      <button onClick={handleNextButtonClick} className="btn btn-primary mr-1">
        Next Date
      </button>
      <ErrorAlert error={reservationsError} />
      <ReservationsList reservations={reservations} />
      <TablesSection />
    </main>
  );
}

export default Dashboard;
