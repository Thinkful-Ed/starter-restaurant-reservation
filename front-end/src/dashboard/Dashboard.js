import React, { useEffect, useState } from "react"
import { listReservations } from "../utils/api"
import ErrorAlert from "../layout/ErrorAlert"
import DashboardNav from "./DashboardNav"

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
export default function Dashboard({ date }) {
  const [reservations, setReservations] = useState([])
  const [reservationsError, setReservationsError] = useState(null)

  useEffect(loadDashboard, [date])

  function loadDashboard() {
    const abortController = new AbortController()
    // console.log("Date: ", date)
    setReservationsError(null)
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .then(console.log)
      .catch(setReservationsError)
    return () => abortController.abort()
  }

  const reservationsList = reservations.map((reservation, index) => (
    <div key={index}>
      <h2>
        {reservation.first_name} {reservation.last_name}
      </h2>
      <h3>{reservation.reservation_time}</h3>
      Party Size: {reservation.people}
    </div>
  ))

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date: {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {reservationsList}
      <DashboardNav date={date} />
    </main>
  )
}
