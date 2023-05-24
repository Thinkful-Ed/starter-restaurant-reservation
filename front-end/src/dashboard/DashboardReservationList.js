import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch, useHistory, useQuery, useLocation } from "react-router";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import DashboardReservationItem from "./DashboardReservationItem";
import { today } from "../utils/date-time";

function DashboardReservationList({reservations, reservationsError, statusToDisplay, loadDashboard, setReservationsError}) {
   
    return <div>
        <table>
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
          {reservations.map(reservation=><DashboardReservationItem loadDashboard={loadDashboard} setReservationsError={setReservationsError} reservation={reservation} statusToDisplay={statusToDisplay}/>)}
        </table>
        <ErrorAlert error={reservationsError} />
    </div>
}

export default DashboardReservationList