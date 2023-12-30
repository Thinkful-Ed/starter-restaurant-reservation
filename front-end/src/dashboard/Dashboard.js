import React, { useEffect, useState } from "react"
import { listReservations, listTables } from "../utils/api"

import ErrorAlert from "../layout/ErrorAlert"
import DashboardNav from "./DashboardNav"
import ListReservations from "./Components/ListReservations"
import ListTables from "./Components/ListTables"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faTachometerAlt,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons"

/**
 *  Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
export default function Dashboard({ date }) {
  const [reservations, setReservations] = useState([])
  const [reservationsError, setReservationsError] = useState(null)
  const [tables, setTables] = useState([])
  const [tablesError, setTablesError] = useState(null)
  const [refresh, setRefresh] = useState(false)

  useEffect(loadDashboard, [date, refresh])

  function loadDashboard() {
    const abortController = new AbortController()
    setReservationsError(null)

    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .then((res) => {
        setRefresh(false)
      })
      .catch(setReservationsError)
    listTables(abortController.signal).then(setTables).catch(setTablesError)

    return () => abortController.abort()
  }

  return (
    <main className="container">
      <div className="row">
        <div className="col col-6">
          <h1>
            <FontAwesomeIcon
              icon={faTachometerAlt}
              size="sm"
              className="mr-2"
            />
            Dashboard
          </h1>
          <h4>
            <FontAwesomeIcon icon={faCalendarAlt} size="sm" /> {date}
          </h4>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col col-12 col-lg-6">
          <DashboardNav date={date} />
          <ListReservations
            reservations={reservations}
            setRefresh={setRefresh}
          />
        </div>
        <div className="col col-12 col-lg-6">
          <ListTables tables={tables} setRefresh={setRefresh} />
        </div>
        <ErrorAlert error={reservationsError} />
        <ErrorAlert error={tablesError} />
      </div>
    </main>
  )
}
