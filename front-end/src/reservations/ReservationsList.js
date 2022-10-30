import React from "react"
import ReservationCard from "./ReservationCard.js"

//Defines reservation list for dashboard and search pages
//If 'searchMode' = true, all reservations returned for search parameters
//Else, all reservations except status cancelled or finished returned.

export default function ReservationsList({ reservations, searchMode }) {
    if (searchMode) {
        const reservationsList = reservations.map((reservation) => {
            return (
                <ReservationCard
                    key={reservation.reservation_id}
                    resrevation={reservation}
                />
            )
        })
        return <div>{reservationsList}</div>
    } else {
        const reservationsList = reservations
            .filter((reservation) => {
                return reservation.status !== "cancelled" || reservation.status !== "finished"
            })
            .map((reservation) => {
                return (
                    <ReservationCard
                        key={reservation.reservation_id}
                        reservation={reservation}
                    />
                )
            })
        return <div>{reservationsList}</div>
    }
}