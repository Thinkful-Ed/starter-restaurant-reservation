import React from "react";

function Listing({reservation}) {
    return (
        <tr>
            <td>{reservation.last_name}</td>
            <td>{reservation.first_name}</td>
            <td>{reservation.mobile_number}</td>
            <td>{reservation.reservation_time}</td>
            <td>{reservation.people}</td>
            <td><a className="btn btn-info" href={`/reservations/${reservation.reservation_id}/seat`} role="button">Seat</a></td>
        </tr>
    )
}

export default Listing;
