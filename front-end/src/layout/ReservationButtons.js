import { Link } from "react-router-dom";
import React from "react";

export default function ReservationButtons({ status, reservation_id, onCancel }) {
    function cancelHandler({
        target: {dataset: { reservationIdCancel }} = {},
    }) {
        if (
            reservationIdCancel && 
            window.confirm(
                "Do you want to cancel this reservation?\n\nThis cannot be undone."
            )
        ) {
            console.log("reservationIdCancel line 15", reservationIdCancel);
            onCancel(reservationIdCancel);
        }
    }

    if(status === "booked") {
        return (
            <>
                <td><Link className="btn btn-success" to={`/reservations/${reservation_id}/seat`}><span className="oi oi-check" />Seat</Link></td>
                <td><Link className="btn btn-primary" to={`/reservations/${reservation_id}/edit`}><span className="oi oi-pencil" />Edit</Link></td>
                <td><button className="btn btn-danger mr-2 cancel" type="button" data-reservation-id-cancel={reservation_id} onCancel={cancelHandler}><span className="oi oi-x" />Cancel</button></td>
            </>
        );
    }
    return (
        <>
            <td />
            <td />
            <td />
        </>
    )
}