import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, previous, next } from "../utils/date-time";
import DateButtons from "./DateButtons";
import ReservationsTable from "../tables/ReservationsTable";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {

const [reservations, setReservations] = useState([]);
const [reservationsError, setReservationsError] = useState(null);

function loadDashboard() {
  const abortController = new AbortController();
  setReservationsError(null);
  setReservations([]);
  listReservations({ date }, abortController.signal)
    .then(setReservations)
    .catch((error) => {
      console.log("Dashboard - reservationsError: ", error);
      setReservationsError(error);
    });
  return () => abortController.abort();
}
  
  
  useEffect(loadDashboard, [date]);

 

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date {date}</h4>
      </div>
      <DateButtons
              previous={`/dashboard?date=${previous(date)}`}
              today={`/dashboard?date=${today()}`}
              next={`/dashboard?date=${next(date)}`}
              date={date}
      />
      <ErrorAlert error={reservationsError} />
      <ReservationsTable reservations={reservations} />
    </main>
  );
}

export default Dashboard;