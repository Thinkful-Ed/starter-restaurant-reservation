import React, { useEffect, useState } from 'react'
import { listReservations } from '../utils/api'
import ErrorAlert from '../layout/ErrorAlert'
import { previous, today, next } from '../utils/date-time'
import { abort } from 'process'

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([])
  const [reservationsError, setReservationsError] = useState(null)
  const [currentDate, setCurrentDate] = useState(today())

  useEffect(() => {
    setReservationsError(null)
    async function loadDashboard() {
      const abortController = new AbortController()
      try {
        const data = await listReservations(currentDate, abortController.signal)
        setReservations(data)
      } catch (error) {
        setReservationsError(error)
      }
      return () => abortController.abort()
    }
    loadDashboard()
  }, [currentDate])

  // function loadDashboard() {
  //   const abortController = new AbortController()
  //   setReservationsError(null)
  //   listReservations({ date }, abortController.signal)
  //     .then(setReservations)
  //     .catch(setReservationsError)
  //   return () => abortController.abort()
  // }

  function clickHandler(target) {
    if (target.name === 'previous') {
      setCurrentDate(previous(date))
    } else if (target.name === 'next') {
      setCurrentDate(next(date))
    } else {
      setCurrentDate(today())
    }
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
      <br />
      <button name="previous" onClick={clickHandler}>
        Previous
      </button>
      <button name="today" onClick={clickHandler}>
        Today
      </button>
      <button name="next" onClick={clickHandler}>
        Next
      </button>
    </main>
  )
}

export default Dashboard
