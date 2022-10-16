import React from "react"

export default function ReservationCard({ reservation }) {
    return (
        <tr>
            <td>{reservation.first_name}</td>
            <td>{reservation.last_name}</td>
            <td>{reservation.mobile_number}</td>
            <td>{reservation.reservation_time}</td>
            <td>{reservation.people}</td>
        </tr>
    )

}