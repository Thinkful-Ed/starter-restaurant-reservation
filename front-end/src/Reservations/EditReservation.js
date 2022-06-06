import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";


function EditReservation() {
    const INITIAL_FORM_STATE = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: ""
    }

    const [formData, setFormData] = useState({ ...INITIAL_FORM_STATE });
    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const { reservation_id } = useParams();

    useEffect(loadReservation, []);

    function loadReservation() {
        const abortController = new AbortController();
        readReservation(reservation_id, abortController.signal)
            .then(setFormData)
            .catch(setErrors)

        return () => abortController.abort();
    }

    function handleChange(event) {
        const { target } = event;
        setFormData({
            ...formData,
            [target.name]: target.value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log("Updated info (edit reservation):", formData);
        let { people } = formData;
        people = Number(people);
        updateReservation({ ...formData, people })
            .then(() => history.push(`/dashboard?date=${formData.reservation_date}`))
            .catch((error) => {
                const splitError = error.message.split("|");
                setErrors(splitError);
            });
    }

    function cancelHandler() {
        history.go(-1);
    }

    const errorMessage = (
        <div className="alert alert-danger">
            Please fix the following errors:
            <ul>
                {errors.map((error, index) => {
                    return <li key={index}>{error}</li>;
                })}
            </ul>
        </div>
    )

    return (
        <main>
            <h1>Edit Reservation #{formData.reservation_id}</h1>
            <ReservationForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                cancelHandler={cancelHandler}
                errors={errors}
                errorMessage={errorMessage}
                formData={formData}
            />
        </main>
    )
}

export default EditReservation;