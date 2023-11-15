import React, { useEffect, useState } from "react";
import {
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationView from "./ReservationView";
import { next, previous } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [currentDate, setCurrentDate] = useState(date);
  date = currentDate;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryDate = searchParams.get("date");
  console.log("QUERY DATE:", queryDate)

  useEffect(loadDashboard, [date, currentDate]);


  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  console.log(reservations)

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
        <div>
        <button onClick={()=>setCurrentDate(previous(currentDate))}>Previous Day</button>
        <button onClick={()=>setCurrentDate(next(currentDate))}>Next Day</button>
        </div>
      </div>
      {reservations.map((reservation) => <ReservationView key={reservation.reservation_id} reservation={reservation} />)}
      <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Dashboard;
