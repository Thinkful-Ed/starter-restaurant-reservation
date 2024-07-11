import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationForm from "../forms/ReservationForm";
import { hasValidDateAndTime } from "../validations/hasValidDateAndTime";
import { createReservation } from "../utils/api";
import useSubmitHandler from "../hooks/useSubmitHandler";

function ReservationCreate() {

    const initialReservationFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 1,
    }
    const [reservation, setReservation] = useState({...initialReservationFormState});  

    const onSuccess = (newReservation) => `/dashboard?date=${newReservation.reservation_date}`;
    const {submitHandler, errors} = useSubmitHandler(createReservation, hasValidDateAndTime, onSuccess);
    const reservationErrors = errors;

    return( 
        <div>
          <h1 className="mb-3">Create Reservation</h1>
          <ErrorAlert errors={reservationErrors} />
          <ReservationForm reservation={reservation} setReservation={setReservation} submitHandler={submitHandler} />
        </div>
    );

}

export default ReservationCreate;