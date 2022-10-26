import React from "react";

function Listing({reservation}) {
    console.log(reservation);
    return (
        <tr>
            <td>{reservation.last_name}</td>
            <td>{reservation.first_name}</td>
            <td>{reservation.mobile_number}</td>
            <td>{reservation.reservation_time}</td>
            <td>{reservation.people}</td>
        </tr>
    )
}

export default Listing;
