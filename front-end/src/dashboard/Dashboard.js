import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import { today, next, previous } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const url = "/dashboard";
  const history = useHistory();
  let queryDate = useQuery().get("date");

  if (!queryDate) {
    queryDate = today();
  }

  useEffect(loadDashboard, [queryDate]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date : queryDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const filteredReservations = reservations
    .filter((reservation) => reservation.reservation_date === queryDate)
    .map((reservation, index) => {
      return (
        <div key={index}>
          <h3>{reservation.first_name} {reservation.last_name}</h3>
          <h5>{reservation.reservation_date}</h5>
          <h5>{reservation.reservation_time}</h5>
        </div>
      );
    });

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      {filteredReservations}
      <ErrorAlert error={reservationsError} />
      <button
        onClick={() => history.push(`${url}?date=${previous(queryDate)}`)}
      >
        Previous Date
      </button>
      <button onClick={() => history.push(`${url}?date=${today()}`)}>
        Current Date
      </button>
      <button onClick={() => history.push(`${url}?date=${next(queryDate)}`)}>
        Next Date
      </button>
    </main>
  );
}

export default Dashboard;
