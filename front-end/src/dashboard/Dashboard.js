import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationCard from "../reservations/ReservationCard";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ todaysDate }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [todaysDate]);

  const { search } = useLocation();
  const selectedDate = search.replace("?date=", "");
  todaysDate = selectedDate ? selectedDate : todaysDate;

 const reservationByDate = reservations.filter((res)=> res.reservation_date === todaysDate)

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({todaysDate}, abortController.signal)
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
      {reservationByDate.length ? reservationByDate.map((reservation, index) => {
        return (
          <div>
            <ReservationCard reservation={reservation} index={index} />
          </div>
        );
      }): reservations.map((reservation, index) => {
        return (
          <div>
            <ReservationCard reservation={reservation} index={index} />
          </div>
        );
      })}
    </main>
  );
}

export default Dashboard;
