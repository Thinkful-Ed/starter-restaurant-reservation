import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { previous, next } from "../utils/date-time";
import ResTable from "./ReservationDash/ResTable";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const history = useHistory();
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

  function handleToday() {
    history.push(`/dashboard`);
  }

  function handlePrev() {
    const newDate = previous(date);
    history.push(`/dashboard?date=${newDate}`);
  }

  function handleNext() {
    history.push(`/dashboard?date=${next(date)}`);
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <div>
        <button className="btn btn-dark mr-1" onClick={handlePrev}>
          Previous
        </button>
        <button className="btn btn-dark mr-1" onClick={handleToday}>
          Today
        </button>
        <button className="btn btn-dark" onClick={handleNext}>
          Next
        </button>
      </div>
      <ErrorAlert error={reservationsError} />
      <div>
        <div>
          <div>
            <h3>Reservations:</h3>
            <div>
              <ResTable
                reservations={reservations}
                setReservations={setReservations}
                setError={setReservationsError}
              />
            </div>
          </div>
          <div>
            <h3>Tables:</h3>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
