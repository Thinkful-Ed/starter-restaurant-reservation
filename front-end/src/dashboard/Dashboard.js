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


  //JSX
  return (
    <>
    <div>
      <h1 className="mt-3 mb-4">Dashboard</h1>
      <NavigationBtns date={date}/>
      <div>
      <ReservationList reservations={reservations} />
      <TableList />
      </div>
      <ErrorAlert error={reservationsError} />
      </div>
    </>
  );
}

export default Dashboard;
