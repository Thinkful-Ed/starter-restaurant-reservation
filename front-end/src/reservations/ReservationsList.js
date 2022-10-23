import React from "react"
import ReservationCard from "./ReservationCard.js"

export default function ReservationsList({ reservations }) {
    const reservationsList = reservations.map((reservation) => {
        return (
            <ReservationCard
                key={reservation.reservation_id}
                reservation={reservation}
            />
        )
    })
    
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Mobile Number</th>
                        <th>Time</th>
                        <th>Number of People</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>{reservationsList}</tbody>
            </table>
        </div>
    )
}