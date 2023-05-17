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
    return <div>
        <div>
            <p>First Name: {first_name}</p>
            <p>Last Name: {last_name}</p>
            <p>Mobile Number: {mobile_number}</p>
            <p>Reservation Date: {reservation_date}</p>
            <p>Reservation Time: {reservation_time}</p>
            <p>Party Size: {people}</p>
            <Link to={`/reservations/${reservation_id}/seat`} className="btn btn-primary" href={`/reservations/${reservation_id}/seat`}>Seat</Link>
        </div>
    </div>
}

export default DashboardReservationItem