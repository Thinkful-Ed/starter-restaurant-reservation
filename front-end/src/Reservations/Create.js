import React, { useState, useEffect } from "react";
import { useHistory, } from "react-router-dom"
import ReservationForm from "./Form";
import {createReservation} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import {checkTuesday, isDatePast, isClosed} from "../utils/date-time"


function ReservationCreate() {
    const [createError, setCreateError] = useState(null);
    const history = useHistory();

    

    async function submitHandler(reservation) {
        reservation.people = Number(reservation.people);
        // let checkDate = `${reservation.reservation_date} ${reservation.reservation_time}`
        // if (checkTuesday(checkDate)) {
        //     setCreateError((prevState) => ({
        //         ...prevState,
        //         message: "We are closed Tuesdays"
        //     })
        //     )
        // }
        // if (isDatePast(checkDate)) {
        //     setCreateError((prevState) => ({
        //         ...prevState,
        //         message: "Please select a date in the future"
        //     })
        //     )
        // }
        // if (isClosed(checkDate)) {
        //     setCreateError((prevState) => ({
        //         ...prevState,
        //         message: "The restaurant is closed at that time"
        //     }))
        // }
        await createReservation(reservation).catch(setCreateError)
        // history.push(`/dashboard?date=${reservation.reservation_date}`)
    }
    console.log(createError);

    const cancel = () => history.goBack();
    


    return (
        <div>
            <h1>Create a new reservation</h1>
            <ErrorAlert error={createError} />
            <ReservationForm onCancel={cancel} submitHandler={submitHandler} />
        </div>
    )
    
}

export default ReservationCreate;