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
    return () => abortController.abort();
  };

  // add bootstrap validation
  return (
    <div>
      <h2 className="p-4 m-4 text-center">Create a Reservation</h2>
      <ReservationForm
        handleSubmit={handleSubmit}
        handleCancel={history.goBack}
        initialFormState={initialFormState}
        reservationsError={reservationsError}
      />
      <ErrorAlert error={reservationsError} />
    </div>
  );
}

export default CreateReservation;
