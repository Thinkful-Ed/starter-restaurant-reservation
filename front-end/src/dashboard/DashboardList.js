import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch, useHistory, useQuery, useLocation } from "react-router";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import DashboardItem from "./DashboardItem";
import { today } from "../utils/date-time";

function DashboardList({date}) {
    const [reservations, setReservations] = useState([]);
    const [reservationsError, setReservationsError] = useState(null);
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
    
    return <div>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">Reservations for {date}</h4>
        </div>
        <div>
          <button onClick={previousHandler}>Previous</button>
          <button onClick={todayHandler}>Today</button>
          <button onClick={forwardHandler}>Next</button>
        </div>
        {reservations.map(reservation=><DashboardItem reservation={reservation}/>)}
        <ErrorAlert error={reservationsError} />
    </div>
}

export default DashboardList