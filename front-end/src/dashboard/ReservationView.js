import React from "react";

function ReservationView({reservation}) {

    return (
        <div>
<div className="card">
  <div className="card-body">
    <h4 className="card-title">{reservation.first_name} {reservation.last_name}</h4>
    <h6 className="card-subtitle mb-2 text-muted">{reservation.people} people</h6>
    <p className="card-text">
      Mobile Number: {reservation.mobile_number}
    </p>
    <p className="card-text">
      Reservation Time: {reservation.reservation_time}
    </p>
    <p>RESERVATION DATE: {reservation.reservation_date}</p>
    
  </div>
</div>
        </div>
    )
}

export default ReservationView;