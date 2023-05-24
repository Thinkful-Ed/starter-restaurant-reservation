import React from "react";
import { Link } from "react-router-dom";
import { updateReservation } from "../utils/api";

function DashboardReservationItem({reservation, statusToDisplay, loadDashboard, setReservationsError}) {
    const {
        first_name,
        last_name,
        mobile_number,
        reservation_date,
        reservation_time,
        people,
        reservation_id,
        status,
    } = reservation

    async function cancelHandler(event) {
        event.preventDefault()
        if (window.confirm("Do you want to cancel this reservation?\n\nThis cannot be undone.")) {
            try {
                await updateReservation("cancelled", reservation_id)
                loadDashboard()
            } catch(error) {
                setReservationsError(error.message)
            }
        }
    }

    return statusToDisplay.includes(status) && <tr>
            <td>{first_name}</td>
            <td>{last_name}</td>
            <td>{mobile_number}</td>
            <td>{reservation_date}</td>
            <td>{reservation_time}</td>
            <td>{people}</td>
            <td data-reservation-id-status={reservation.reservation_id}>{status}</td>
            <td>{status==="booked" && <Link to={`/reservations/${reservation_id}/seat`} className="btn btn-primary" href={`/reservations/${reservation_id}/seat`}>Seat</Link>}</td>
            <td><Link to={`/reservations/${reservation_id}/edit`} className="btn btn-primary" href={`/reservations/${reservation_id}/edit`}>Edit</Link></td>
            <td><button onClick={cancelHandler} className="btn btn-primary" data-reservation-id-cancel={reservation.reservation_id}>Cancel</button></td>
        </tr>
}

export default DashboardReservationItem