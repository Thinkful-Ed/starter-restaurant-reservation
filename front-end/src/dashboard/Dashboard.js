import React, { useEffect, useState } from "react";
import { useParams, Switch, Route, useRouteMatch, useHistory, useLocation } from "react-router";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import DashboardReservationList from "./DashboardReservationList";
import DashboardTableList from "./DashboardTableList";
import { today } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const { path, url } = useRouteMatch()
  const history = useHistory()

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const reservationDate = queryParams.get('date')

  if(reservationDate) {
      date = reservationDate
  }

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function previousHandler() {
    const currentDate = new Date(date)
    currentDate.setDate(currentDate.getDate() - 1)
    const previousDate = currentDate.toISOString().slice(0,10)
    history.push(`/dashboard/?date=${previousDate}`)
  }

  function forwardHandler() {
    const currentDate = new Date(date)
    currentDate.setDate(currentDate.getDate() + 1)
    const nextDate = currentDate.toISOString().slice(0,10)
    history.push(`/dashboard/?date=${nextDate}`)
  }

  function todayHandler() {
    const currentDate = new Date(today())
    history.push(`/dashboard/?date=${currentDate.toISOString().slice(0,10)}`)
  }

  const statusToDisplay = [
    "seated",
    "booked",
    "cancelled"
  ]

  return (
    <main>
      <h1>Dashboard</h1>
        <Switch>
          <Route path={`${path}`}>
          <div className="d-md-flex mb-3">
            <h4 className="mb-0">Reservations for {date}</h4>
          </div>
          <div>
            <button onClick={previousHandler}>Previous</button>
            <button onClick={todayHandler}>Today</button>
            <button onClick={forwardHandler}>Next</button>
          </div>
            <DashboardReservationList date={date} reservations={reservations} setReservations={setReservations} reservationsError={reservationsError} setReservationsError={setReservationsError} statusToDisplay={statusToDisplay}/>
            <DashboardTableList reservations={reservations} setReservations={setReservations} reservationsError={reservationsError} setReservationsError={setReservationsError}/>
          </Route>
        </Switch>
    </main>
  );
}

export default Dashboard;
