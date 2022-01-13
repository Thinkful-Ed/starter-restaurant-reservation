import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom"
import ReservationForm from "./Form";


function ReservationCreate() {
    const history = useHistory();
    const { date } = useParams;

    function submitHandler(reservation) {
        // call API function on the reservation
        //history.push()
        console.log("Hi, mom")
    }

    function cancel() {
        history.goBack();
    }

    return (
        <div>
            <h1>Create a new reservation</h1>
            <ReservationForm onCancel={cancel} onSubmit={submitHandler}/>
        </div>
    )

}

export default ReservationCreate;