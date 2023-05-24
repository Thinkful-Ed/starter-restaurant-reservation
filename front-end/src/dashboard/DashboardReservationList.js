import React from "react";
import ErrorAlert from "../layout/ErrorAlert";
import DashboardReservationItem from "./DashboardReservationItem";

function DashboardReservationList({reservations, reservationsError, statusToDisplay, loadDashboard, setReservationsError}) {
   
    return <div>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Mobile Number</th>
              <th>Reservation Date</th>
              <th>Reservation Time</th>
              <th>Party Size</th>
              <th>Status</th>
              <th>Seat Table</th>
              <th>Edit Reservation</th>
              <th>Cancel Reservation</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(reservation=><DashboardReservationItem key={reservation.reservation_id} loadDashboard={loadDashboard} setReservationsError={setReservationsError} reservation={reservation} statusToDisplay={statusToDisplay}/>)}
          </tbody>
        </table>
        <ErrorAlert error={reservationsError} />
    </div>
}

export default DashboardReservationList