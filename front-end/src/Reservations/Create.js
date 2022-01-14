// import React, { useEffect, useState } from "react";
import { useHistory, } from "react-router-dom"
import ReservationForm from "./Form";
import {createReservation} from "../utils/api";


function ReservationCreate() {
    const history = useHistory();

    async function submitHandler(reservation) {
        // call API function on the reservation
        await createReservation(reservation);
        history.push(`/dashboard?date=${reservation.reservation_date}`)
    }

    function cancel() {
        history.goBack();
    }

    return (
        <div>
            <h1>Create a new reservation</h1>
            <ReservationForm onCancel={cancel} onSubmit={submitHandler} />
        </div>
    )
}

export default ReservationCreate;