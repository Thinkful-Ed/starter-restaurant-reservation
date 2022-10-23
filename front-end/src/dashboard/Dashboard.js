import React, { useEffect, useState } from "react";
import axios from "axios"
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery"
import ReservationsList from "../reservations/ReservationsList"
import TablesList from "../tables/TablesList"


/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const query = useQuery()
  date = query.get("date") || date
  const URL = process.env.REACT_APP_API_BASE_URL

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([])
  const [tablesError, setTablesError] = useState(null)

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  useEffect(() => {
    const abortController = new AbortController()
    setTablesError(null)
    async function listTables() {
      try {
        const response = await axios.get(URL + "/tables", {
          signal: abortController.signal,
        })
        setTables(response.data.data)
      } catch (error) {
        setTablesError(error)
      }
    }
    listTables()
    return () => abortController.abort()
  }, [URL])

  return (
    <main>
      <div>
        <h1>Dashboard</h1>
        <ErrorAlert error={reservationsError} />
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">Reservations for {date}</h4>
        </div>
        <div>
        <ReservationsList reservations={reservations} />
        </div>
        <ErrorAlert error={tablesError} />
        <div>
          <h4>Tables</h4>
        </div>
        <div>
          <TablesList tables={tables} />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
