import React, { useState } from "react";
import ReservationForm from "./ReservationForm";
import { useHistory } from "react-router";
import { createReservation } from "../utils/api";
import { formatAsDate } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";
import "./reservation.css"

function NewReservations() {
  const initReservation = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [reservation, setReservation] = useState(initReservation);
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();

    const abortController = new AbortController();

    createReservation(reservation, abortController.signal)
      .then((createdReservation) => history.push(`/dashboard?date=${formatAsDate(reservation.reservation_date)}`))
      .catch(setReservationsError)

    return () => abortController.abort();
  };
  const cancelHandler = () => {
    history.goBack();
  };
  return (
    <div className="new-reservation-container">
      <h3>New Reservation:</h3>
      <ErrorAlert error={reservationsError} />
      <ReservationForm
        reservation={reservation}
        setReservation={setReservation}
        submitHandler={submitHandler}
        cancelHandler={cancelHandler}
      />
    </div>
  );
}

export default NewReservations;
