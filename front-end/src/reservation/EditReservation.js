import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReservationForm from "../reservation/ReservationForm"
import { getReservationById, editReservation } from "../utils/api";

function EditReservation() {
    const [reservation, setReservation] = useState({})
    const [reservationError, setReservationError] = useState(null)
    const {reservation_id} = useParams()

    useEffect(loadReservation, [])

function loadReservation() {
        const abortController = new AbortController()
        setReservationError(null)
        getReservationById(reservation_id, abortController.signal)
            .then(reservation=>setReservation({...reservation}))
            .catch(setReservationError)
        return () => abortController.abort()
    }

    let initialFormState = {
        reservation_id: reservation.reservation_id,
        first_name: reservation.first_name,
        last_name: reservation.last_name,
        mobile_number: reservation.mobile_number,
        reservation_date: reservation.reservation_date,
        reservation_time: reservation.reservation_time && reservation.reservation_time.slice(0,5),
        people: reservation.people
    }

    function apiHandler(formData) {
        return editReservation(formData)
    }

    return <div>
        <h3>Edit a Reservation</h3>
        <ReservationForm initialFormState={initialFormState} apiHandler={apiHandler}/>
    </div>
}

export default EditReservation