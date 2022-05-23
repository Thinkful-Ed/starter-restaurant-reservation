import React from "react";
import CancelButton from "../Buttons/CancelButton";
import EditButton from "../Buttons/EditButton";
import SeatButton from "../Buttons/SeatButton";

function ReservationList({ reservationData, setError }) {

  const formatedReservations = reservationData.map((reservation) => {
    return (
      <div
        key={reservation.reservation_id}
        className="border-bottom border-dark"
      >
        <h3>
          {reservation.first_name} {reservation.last_name}
        </h3>
        <h5>Reservation Date : {reservation.reservation_date}</h5>
        <h5>Reservation Time : {reservation.reservation_time}</h5>
        <h5 data-reservation-id-status={reservation.reservation_id}>
          Status : {reservation.status}
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
