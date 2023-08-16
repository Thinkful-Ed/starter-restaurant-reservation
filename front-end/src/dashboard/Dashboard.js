import React from "react";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsList from "./ReservationsList";
import moment from "moment/moment";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ reservations, reservationsError }) {
 

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <h4>{moment().format('MMMM Do YYYY, h:mm:ss a')}</h4>
      <ErrorAlert error={reservationsError} />
      <ReservationsList reservations={reservations} />
    </main>
  );
}

export default Dashboard;
