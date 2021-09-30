import React, { useEffect, useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import { listReservations, listTables } from "../utils/api";
import formatDisplayDate from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date }) {
  const dateInUrl = useQuery().get("date");
  if (dateInUrl) {
    date = dateInUrl;
  }
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

  const getReservations = reservations.map(
    (
      {
        first_name,
        last_name,
        mobile_number,
        reservation_date,
        reservation_time,
        people,
        reservation_id,
      }
    ) => (
           <tr>
      <th scope="row">{reservation_id}</th>
      <td>{first_name}</td>
      <td>{last_name}</td>
      <td>{mobile_number}</td>
      <td>{reservation_date.substr(0, 10)}</td>
      <td>{reservation_time.substr(0, 5)}</td>
      <td>{people}</td>
      <td data-reservation-id-status={reservation_id}>
      </td>
      </tr>
    )
  );

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
