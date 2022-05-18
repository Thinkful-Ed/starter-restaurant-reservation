import React from "react";
import CancelButton from "../utils/CancelButton";
import EditButton from "../utils/EditButton";

function ReservationList({ reservationData, setError }) {
  function SeatButton({ reservation }) {
    if (reservation.status !== "seated") {
      return (
        <a href={`/reservations/${reservation.reservation_id}/seat`}>
          <button type="button">Seat</button>
        </a>
      );
    } else {
      return "";
    }
  }

  const formatedReservations = reservationData.map((reservation, index) => {
    return (
      <div key={index}>
        <h3>
          {reservation.first_name} {reservation.last_name}
        </h3>
        <h5>{reservation.reservation_date}</h5>
        <h5>{reservation.reservation_time}</h5>
        <h5 data-reservation-id-status={reservation.reservation_id}>
          {reservation.status}
        </h5>
        <SeatButton reservation={reservation} />
        <EditButton reservation={reservation} />
        <CancelButton reservation={reservation} setError={setError} />
      </div>
    );
  });

  return formatedReservations;
}

export default ReservationList;
