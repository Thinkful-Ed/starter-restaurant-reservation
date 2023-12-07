import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { cancelReservation, listReservationsByDate } from "../utils/api";

function ReservationView({reservation, date, setReservations}) {


async function handleCancel() {
  const shouldCancel = window.confirm(
    "Do you want to cancel this reservation? This cannot be undone."
  );

  if (shouldCancel) {
    try {
      await cancelReservation(reservation.reservation_id);
      const updatedReservations = await listReservationsByDate(date);
      setReservations(updatedReservations)
    } catch (error) {
      console.error("Error canceling reservation:", error.message);
    }
  }
  }

  const {first_name, last_name, people, mobile_number, status, reservation_id, reservation_time, reservation_date} = reservation

    return (
        <div>
<div className="card">
  <div className="card-body">
    <h4 className="card-title">{first_name} {last_name}</h4>
    <h6 className="card-subtitle mb-2 text-muted">{people} people</h6>
    <p className="card-text">
      Mobile Number: {mobile_number}
    </p>
    <p className="card-text">
      Reservation Time: {reservation_time}
    </p>
    <p>RESERVATION DATE: {reservation_date}</p>
    <p data-reservation-id-status={reservation_id}>Status: {status}</p>
    {(status === "booked") && <Link to={`/reservations/${reservation_id}/seat`} className="btn btn-info">Seat</Link>}
  </div>
  <div>
    <Link to={`/reservations/${reservation_id}/edit`} className="btn btn-info">Edit</Link>
    <button onClick={handleCancel} data-reservation-id-cancel={reservation_id} className="btn btn-danger">Cancel</button>
  </div>
</div>
        </div>
    )
}

export default ReservationView;