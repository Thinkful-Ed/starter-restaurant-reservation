import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

/**
 * PUT request only works if I prevent default of the anchor tag
 */

function ReservationCard({ reservation }) {
  const history = useHistory();
  const updateReservation = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5001/reservations/${e.target.value}/status`, {
      method: "DELETE",
      body: JSON.stringify({ ...reservation, status: "Seated" }),
      headers: {
        "Content-type": "application/json;charset=UTF-8",
      },
    });
    console.log("saved table has been seated");
    history.push(`/reservations/${e.target.value}/seat`);
  };
  console.log("reservation: ", reservation);
  const {
    reservation_id,
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
    status,
  } = reservation;
  return (
    <div className="bg-warning">
      <h2>{`${last_name}, ${first_name}(${people})`}</h2>
      <h5>
        {reservation_date} @ {reservation_time}
      </h5>
      <h6 data-reservation-id-status={reservation.reservation_id}>{status}</h6>
      <p>Ph#: {mobile_number}</p>
      {status === "Booked" ? (
        <a href={`/reservations/${reservation_id}/seat`}>
          <button onClick={updateReservation} value={reservation_id}>
            Seat
          </button>
        </a>
      ) : (
        ""
      )}
    </div>
  );
}

export default ReservationCard;
