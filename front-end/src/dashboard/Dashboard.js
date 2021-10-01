import React, { useEffect, useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import { listReservations } from "../utils/api";
//import formatDisplayDate from "../utils/date-time";
import ReservationList from "./ReservationList";
import NavigationBtns from "./NavigationBtns"

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

  return (
    <>
      <h1>Dashboard</h1>
      <NavigationBtns date={date}/>
      <table className="table">
        <thead>
          <tr>
            <td>First name</td>
            <td>Last name</td>
            <td>Phone</td>
            <td>Reservation date</td>
            <td>Reservation time</td>
            <td>Party size</td>
          </tr>
        </thead>
      </table>
      <ErrorAlert error={reservationsError} />
      <ReservationList reservations={reservations}/>
    </>
  );
}

export default Dashboard;
