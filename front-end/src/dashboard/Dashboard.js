import React, { useEffect, useState } from "react";
import ReservationList from "../reservations/ReservationList";
import { listReservations } from "../utils/api";
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

  const handlePrevious = () => {
    const previousDate = previous(date);
    loadDashboard(previousDate);
  };

  const handleToday = () => {
    const todayDate = today();
    loadDashboard(todayDate);
  };

  const handleNext = () => {
    const nextDate = next(date);
    loadDashboard(nextDate);
  };

  return (
    <main>
      <h1 className="p-4 m-4 text-center">Dashboard</h1>
      <div className="p-4 m-4 flex w-75 mx-auto bg-light">
      <div className="d-md-flex mb-3">
        <h4 className="mb-0 mx-auto">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <ReservationList
      reservations={reservations}
      loadDashboard={loadDashboard} />
      <div className="d-flex justify-content-between p-2">
        <button 
        type="button" 
        className="btn btn-dark"
        onClick={handlePrevious}>
          Previous
        </button>
        <button 
        type="button" 
        className="btn btn-secondary"
        onClick={handleToday}>
          Today
        </button>
        <button 
        type="button"
        className="btn btn-dark"
        onClick={handleNext}>
          Next
        </button>
      </div>
      </div>
    </main>
  );
}

export default Dashboard;
