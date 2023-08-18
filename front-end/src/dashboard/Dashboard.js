import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, next, previous } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import DisplayReservations from "./DisplayReservation";
import DisplayTable from "./DisplayTable";
import axios from "axios";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";
function Dashboard({ date }) {
  const query = useQuery();
  const thisDate = query.get("date") || today();
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();
  const location = useLocation();
  // console.log({ thisDate });
  useEffect(loadDashboard, [thisDate]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    // console.log("loadDashboard");
    // console.log({ date: thisDate });
    listReservations({ date: thisDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    // console.log({ reservations });
    return () => abortController.abort();
  }

  useEffect(() => {
    async function loadTables() {
      const abortController = new AbortController();
      const signal = abortController.signal;
      try {
        const response = await axios.get(`${API_BASE_URL}/tables`, { signal });
        setTables(response.data.data);
      } catch (error) {
        console.log(error, "error loading tables");
      }
    }
    loadTables();
  }, []);

  //this should only run when the location.state.shouldReload is true
  useEffect(() => {
    if (location.state && location.state.shouldReload) {
      async function loadTables() {
        const abortController = new AbortController();
        const signal = abortController.signal;
        try {
          const response = await axios.get(`${API_BASE_URL}/tables`, {
            signal,
          });
          setTables(response.data.data);
        } catch (error) {
          console.log(error, "error loading tables");
        }
      }
      loadTables();
      location.state.shouldReload = false;
    }
  }, [location.state]);

  function handleNext() {
    // console.log("handleNext");
    const nextDate = next(thisDate);
    // console.log({ nextDate });
    history.push(`/dashboard?date=${nextDate}`);
  }

  function handlePrevious() {
    // console.log("handlePrevious");
    const previousDate = previous(thisDate);
    // console.log({ previousDate });
    history.push(`/dashboard?date=${previousDate}`);
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {thisDate} </h4>
      </div>
      <button className="btn btn-secondary" onClick={handlePrevious}>
        Previous
      </button>
      <button className="btn btn-secondary" onClick={handleNext}>
        Next
      </button>
      {reservations.map((reservation) => (
        <DisplayReservations
          key={reservation.reservation_id}
          reservation={reservation}
        />
      ))}
      <br />
      {tables.map((table) => (
        <DisplayTable key={table.table_id} table={table} />
      ))}
      <ErrorAlert error={reservationsError} />
    </main>
  );
}

export default Dashboard;
