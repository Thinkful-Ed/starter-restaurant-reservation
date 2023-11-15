import React, { useEffect, useState } from "react";
import {
  useLocation,
  useHistory,
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
  const history = useHistory();
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [currentDate, setCurrentDate] = useState(date);
  date = currentDate;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryDate = searchParams.get("date");
  console.log("QUERY DATE:", queryDate)

  useEffect(() => {
    if (queryDate && queryDate !== currentDate) {
      setCurrentDate(queryDate);
    }
  }, [queryDate, currentDate]);

  useEffect(loadDashboard, [date, currentDate]);


  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
        <div>
        <button onClick={()=>history.push(`/dashboard?date=${previous(currentDate)}`)}>Previous Day</button>
        <button onClick={()=>history.push(`/dashboard?date=${next(currentDate)}`)}>Next Day</button>
        </div>
      </div>
      {reservations.map((reservation) => <ReservationView key={reservation.reservation_id} reservation={reservation} />)}
      <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Dashboard;
