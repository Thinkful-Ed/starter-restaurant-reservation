import React from "react";
import { Link } from "react-router-dom";

function DashboardReservationItem({reservation}) {
    const {
        first_name,
        last_name,
        mobile_number,
        reservation_date,
        reservation_time,
        people,
        reservation_id,
    } = reservation
    return <tr>
            <td>{first_name}</td>
            <td>{last_name}</td>
            <td>{mobile_number}</td>
            <td>{reservation_date}</td>
            <td>{reservation_time}</td>
            <td>{people}</td>
            <td><Link to={`/reservations/${reservation_id}/seat`} className="btn btn-primary" href={`/reservations/${reservation_id}/seat`}>Seat</Link></td>
        </tr>
}

export default DashboardReservationItem