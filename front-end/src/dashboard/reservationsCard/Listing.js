import React from "react";

function Listing({reservation}) {
    const { reservation_id, last_name, first_name, mobile_number, reservation_time, people } = reservation
    return (
        <tr>
            <td>{last_name}</td>
            <td>{first_name}</td>
            <td>{mobile_number}</td>
            <td>{reservation_time}</td>
            <td>{people}</td>
            <td><a className="btn btn-info" href={`/reservations/${reservation_id}/seat`} role="button">Seat</a></td>
        </tr>
    )
}

export default Listing;
