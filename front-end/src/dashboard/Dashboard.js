import React, { useEffect, useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import { listReservations } from "../utils/api";
//import formatDisplayDate from "../utils/date-time";
import ReservationList from "../reservations/ReservationList";
import NavigationBtns from "./NavigationBtns"
import TableList from "../tables/TableList";

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
      <div className="d-flex flex-row">
        <div className="d-flex col-8">
      <ReservationList reservations={reservations}/>
      </div>
      <div className="d-flex col-5">
      <TableList />
      </div>
      </div>
      <ErrorAlert error={reservationsError} />
    </>
  );
}

export default Dashboard;
