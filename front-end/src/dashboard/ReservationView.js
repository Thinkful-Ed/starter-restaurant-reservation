import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function ReservationView({reservation}) {

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
</div>
        </div>
    )
}

export default ReservationView;