import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);
  
  const {selectedDate} = useParams()
  date = selectedDate ? selectedDate : date

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({date}, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      {reservations.map((reservation, index)=>{
        return (
          <div key={index}>
            <h3>{reservation.last_name},{reservation.first_name}</h3>
            <span>Mobile Number: {reservation.mobile_number}</span>
            <br></br>
            <span>Date: {reservation.reservation_date} | Time: {reservation.reservation_time}</span>
          </div>
        )
      })}
    </main>
  );
}

export default Dashboard;
