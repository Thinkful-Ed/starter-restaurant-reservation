import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import { today, next, previous } from "../utils/date-time";
import ResCard from "../dashboard/pieces/ResCard";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const [date, setDate] = useState(query.get("date") || today());
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  
  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    //check that date is a valid date in the format YYYY-MM-DD
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      setReservationsError({message:"Invalid date"});
      return;
    }
    
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function handleDateChange(event) {
    setDate(event.target.value);
  }

  function previousDay() {
    setDate(previous(date));
  }
  
  function nextDay() {
    setDate(next(date));
  }

  function setToday() {
    setDate(today());
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <button onClick={previousDay}>🔙</button><button onClick={setToday}>Today</button><button onClick={nextDay}>🔜</button>
      <form>
        <input type="date" value={date} onChange={handleDateChange} />
      </form>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {reservations.map(reservation => (  <ResCard key={reservation.id} reservation={reservation} /> ))}
    </main>
  );
}

export default Dashboard;
