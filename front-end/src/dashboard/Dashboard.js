import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations } from "../utils/api";
import Listing from "./Listing";
import ErrorAlert from "../layout/ErrorAlert";
import { next, previous } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [currentDate, setCurrentDate] = useState(getDate());
  const history = useHistory();

  useEffect(loadDashboard, [currentDate]);

  function getDate() {
    const queryParams = new URLSearchParams(window.location.search);
    const dateTerm = queryParams.get("date");
    return dateTerm ? dateTerm : date;
  }

  function loadDashboard() {
    history.push(`/dashboard?date=${currentDate}`);
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({date: currentDate}, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  const goToPrev = () => {
    setCurrentDate((current) => previous(current));
  }

  const goToToday = () => {
    history.push("/");
  }

  const goToNext = () => {
    setCurrentDate((current) => next(current));
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
                {reservations.map(reservation => <Listing key={`reservation-${reservation.reservation_id}`} reservation={reservation} />)}
              </tbody>
            </table>
          </div>
          <div className="card-footer">
            <button type="button" className="btn btn-danger mr-3" onClick={goToPrev}>Prev</button>
            <button type="button" className="btn btn-success mr-3" onClick={goToToday}>Today</button>
            <button type="button" className="btn btn-primary" onClick={goToNext}>Next</button>
          </div>
        </div>
      </div>
      
    </main>
  );
}

export default Dashboard;
