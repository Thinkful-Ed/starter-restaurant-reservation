import React, { useState } from "react";
import { useHistory, } from "react-router-dom"
import ReservationForm from "./Form";
import {createReservation} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";


function ReservationCreate() {
    const [createError, setCreateError] = useState(null);
    const history = useHistory();

    function checkTuesday(date) {
        let d = new Date(date);
        if (d.getDay() === 1) return true;
        return false;
    }

    async function submitHandler(reservation) {
        reservation.people = Number(reservation.people);
        console.log(checkTuesday(reservation.reservation_date));
        // await createReservation(reservation);
        // history.push(`/dashboard?date=${reservation.reservation_date}`)
    }

    const cancel = () => history.goBack();
    
    // let error = {
    //     message: "Whoa!"
    // }
    // let mess = () => setCreateError({message: "Whoa"});
    // // mess();

    return (
        <div>
            <h1>Create a new reservation</h1>
            {/* <ErrorAlert error={} /> */}
            <ReservationForm onCancel={cancel} submitHandler={submitHandler} />
        </div>
    )
}

export default ReservationCreate;