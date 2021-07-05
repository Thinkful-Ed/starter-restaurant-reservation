import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";

import ReservationCard from "../common-components/ReservationCard";
import ErrorAlert from "../layout/ErrorAlert";
import DateHandler from "./DateHandler";

import useQuery from "../utils/useQuery";
import dayjs from "dayjs";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const query = useQuery();
  const date = query.get("date") || dayjs().format("YYYY-MM-DD");

  useEffect(loadDashboard, [date]);

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
        <h4 className="mb-0">Reservations for: {date}</h4>
      </div>
      <DateHandler date={date} />
      <ErrorAlert error={reservationsError} />
      {reservations.map((reservation, idx) => (
        <ReservationCard key={idx} reservation={reservation} />
      ))}
    </main>
  );
}

export default Dashboard;
