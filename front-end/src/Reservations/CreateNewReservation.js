import React from "react";
import ReservationForm from "./ReservationForm";

export default function CreateNewReservation() {
  return (
    <>
      <style>{"body { background-color: #f7f4f180; }"}</style>
      <ReservationForm eventType="create" />
    </>
  );
}
