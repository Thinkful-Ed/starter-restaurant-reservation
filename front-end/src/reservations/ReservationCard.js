import React from "react";

function ReservationCard({ reservation, index }) {
  return (
    <div key={index}>
      <h3>
        {reservation.last_name},{reservation.first_name}
      </h3>
      <span>Mobile Number: {reservation.mobile_number}</span>
      <br></br>
      <span>
        Date: {reservation.reservation_date} | Time:{" "}
        {reservation.reservation_time}
      </span>
    </div>
  );
}

export default ReservationCard;
