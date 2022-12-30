import React from "react";
import { useParams } from "react-router-dom";

function CurrentReservation() {
  const { reservationId } = useParams();
  return <div>I AM RESERVATION {reservationId}</div>;
}

export default CurrentReservation;
