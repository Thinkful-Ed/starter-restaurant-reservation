import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import Listing from "./Listing";
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
  const [currentDate, setCurrentDate] = useState(date);

  useEffect(loadDashboard, [currentDate]);

  function getDate() {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get("date");
  }



  function loadDashboard() {
    const abortController = new AbortController();
    const dateTerm = getDate();
    if (dateTerm) {setCurrentDate(dateTerm)}
    setReservationsError(null);
    listReservations({date: currentDate}, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function todayHandler() {

  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="col-6 mb-3">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title mb-0">Reservations for {currentDate}</h4>
          </div>
          <div className="card-body">
            <ErrorAlert error={reservationsError} />
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Last Name</th>
                  <th>First Name</th>
                  <th>Mobile Number</th>
                  <th>Time</th>
                  <th>Party</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map(reservation => <Listing reservation={reservation} />)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
    </main>
  );
}

export default Dashboard;
