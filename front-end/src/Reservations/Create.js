import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReservationForm from "./Form";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationCreate() {
  const [createError, setCreateError] = useState(null);
  const history = useHistory();

  async function submitHandler(reservation) {
    reservation.mobile_number = (reservation.mobile_number).replace(/[^0-9.]/g, '')
    reservation.people = Number(reservation.people);
    await createReservation(reservation)
        .then(() => history.push(`/dashboard?date=${reservation.reservation_date}`))
        .catch(setCreateError);
  }

  const cancel = () => history.goBack();

  return (
    <div>
      <h1>Create a new reservation</h1>
      <ErrorAlert error={createError} />
      <ReservationForm onCancel={cancel} submitHandler={submitHandler} />
    </div>
  );
}

export default ReservationCreate;
