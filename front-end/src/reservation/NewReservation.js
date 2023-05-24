import React from "react";

import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import ReservationForm from "../reservation/ReservationForm"
import NotFound from "../layout/NotFound";
import { createReservation } from "../utils/api";

function NewReservation() {
    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: ""
    }

    function apiHandler(formData) {
        return createReservation(formData)
    }

    return <div>
        <h3>Create a New Reservation</h3>
        <ReservationForm initialFormState={initialFormState} apiHandler={apiHandler}/>
    </div>
}

export default NewReservation