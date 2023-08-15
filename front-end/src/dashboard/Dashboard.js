import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery"
import { today } from "../utils/date-time";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../utils/api";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({error, setError}) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  let date = useQuery().get("date");

  if (!date) {
    date = today();
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

  // allows user to choose which day they see the reservations on

  function chooseWhichDay(date, days){
    const dateSelected = new Date(date);
    dateSelected.setDate(dateSelected.getDate() + days);
    return dateSelected
  }


  async function putStatus(reservationId) {
    try {
      const response = await fetch(`${API_BASE_URL}/reservations/${reservationId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { status: "finished" } }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred while processing the request.");
        return;
      }
  
      const { data } = await listReservations();
      setReservations(data);
  
      const finishedReservation = await response.json();
      console.log("Reservation status:", finishedReservation);
    } catch (error) {
      setError(error.message || "An error occurred.");
    }
  }



  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
