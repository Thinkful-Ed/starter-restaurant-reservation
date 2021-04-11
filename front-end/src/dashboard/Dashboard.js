import React, { useEffect, useState } from 'react'
import { listReservations } from '../utils/api'
import ErrorAlert from '../layout/ErrorAlert'
import { useHistory } from 'react-router-dom'
import ReservationList from '../reservation/ReservationList'
import TableComp from '../Table/Table'
import TableList from './TableList'
import ReservationStatus from '../reservation/ReservationStatus'

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }, props) {
  let history = useHistory()
  const [reservations, setReservations] = useState([])
  const [reservationsError, setReservationsError] = useState(null)

  useEffect(loadDashboard, [date])

  function loadDashboard() {
    const abortController = new AbortController()
    setReservationsError(null)
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError)
    return () => abortController.abort()
  }

  const handleRoutes = () => {
    // history.push(`/reservations/new`, { from: '/dashboard' })
    history.goBack()
  }



  return (
    <>
      <main>
        <h1>Dashboard</h1>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">Reservations for date</h4>
        </div>

        {reservationsError ? (
          <ErrorAlert error={reservationsError} />
        ) : (
          <TableComp date={date}/>
        )}
        <button
          type="submit"
          className="btn btn-secondary float-right"
          onClick={handleRoutes}
        >
          Cancel
        </button>
      </main>

      {/* Reservation List (Show on Dashboard and Search Page) */}
      <ReservationList />
      <button
        type="submit"
        className="btn btn-secondary float-right"
        onClick={handleRoutes}
      >
        Cancel
      </button>

      {/* // List of Tables Booked */}
      <TableList />

      {/* To Show Status Regarding Reservation on Dashboard Page  */}
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservation Status</h4>
      </div>
      <ReservationStatus />
    </>
  )
}

export default Dashboard
