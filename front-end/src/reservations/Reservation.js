import React from "react";

export default function Reservation({ reservation }) {
  return (
    <>
      <p>
        {reservation.last_name} , {reservation.first_name}
      </p>
      <p>
        {reservation.reservation_time} on {reservation.reservation_date}
      </p>
      <p>For {reservation.people} people/person</p>
    </>
  );
}
