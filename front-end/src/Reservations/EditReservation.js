import React from "react";
import { useParams } from "react-router-dom";
import ReservationForm from "./ReservationForm";

export default function EditReservation() {
  const { reservation_id } = useParams();

  return <ReservationForm reservation_id={reservation_id} eventType="edit" />;
}
