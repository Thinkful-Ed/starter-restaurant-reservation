import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import { formatAsDate } from "../utils/date-time";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

function CreateReservation() {
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    people: "",
    reservation_date: "",
    reservation_time: "",
  };

  const [reservationsError, setReservationsError] = useState(null);

  const history = useHistory();

  const handleSubmit = async (newReservation) => {
    const abortController = new AbortController();
    try {
      const createdReservation = await createReservation(newReservation);
      history.push(
        `/dashboard?date=${formatAsDate(createdReservation.reservation_date)}`
      );
    } catch (error) {
      setReservationsError(error);
    }
    return abortController;
  };

  // add bootstrap validation
  return (
    <div className="container-fluid d-flex flex-column w-75">
      <h1 className="p-4 m-2 text-center fs-1 fw-bold">Create a Reservation</h1>
      <ReservationForm
        handleSubmit={handleSubmit}
        initialFormState={initialFormState}
        reservationsError={reservationsError}
      />
      <ErrorAlert error={reservationsError} />
    </div>
  );
}

export default CreateReservation;
