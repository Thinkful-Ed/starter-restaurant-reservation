import React from "react";
import Reservation from "./Reservation";

const ReservationsList = ({ reservations }) => {
  const list = reservations.map((reservation) => (
    <Reservation
      key={reservation.reservation_id}
      reservation={reservation}
    />
  ))
  return (
    <div className="row">
        {list}
    </div>
  );
};

export default ReservationsList;