import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ReservationForm from "./ReservationForm";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function NewReservation() {
  const history = useHistory();

  const [reservationError, setReservationError] = useState(null);

  const initialFormState = {
    "first_name": "",
    "last_name": "",
    "mobile_number": "",
    "reservation_date": "",
    "reservation_time": "",
    "people": 1,
  };

  function handleNewReservationSubmit(newReservation) {
    newReservation = { ...newReservation, people: Number(newReservation.people) };
    if (newReservation.reservation_time.length === 5) {
      newReservation = { ...newReservation, reservation_time: (newReservation.reservation_time + ":00")}
  }
    setReservationError(null); // Clear any previous errors
    createReservation(newReservation)
      .then((data) => {
        const dateQueryParam = newReservation.reservation_date;
        // console.log("RESERVATION DATE:", dateQueryParam);
        history.push(`/dashboard?date=${dateQueryParam}`);
      })
      .catch((error) => {
        // Handle API request errors here
        console.error("Error creating reservation:", error);
        setReservationError(error); // Set the error state for rendering in UI
      });
  }

  function handleCancel() {
    console.log("NEW RESERVATION CANCEL")
    history.push("/dashboard");
}

  return (
    <div>
      <h1>Create a new reservation</h1>
      <ErrorAlert error={reservationError} />
      <ReservationForm
        initialFormState={initialFormState}
        submitAction={handleNewReservationSubmit}
        handleCancel={handleCancel}
      />
    </div>
  );
}

export default NewReservation;