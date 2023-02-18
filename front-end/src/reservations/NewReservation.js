import React, { useState } from "react";
import { createReservation } from "../utils/api";
import { useLocation, useHistory } from "react-router-dom";
import ReservationForm from "./ReservationForm";
import ValidateReservation from "./ValidateReservation";


export default function NewReservation() {
    const history = useHistory();
    let location = useLocation();
    let query = new URLSearchParams(location.search);
    const [errorDiv, setErrorDiv] = useState();
   
    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
    }
    
    const [formData, setFormData] = useState(initialFormState);
  
    const handleChange = ({ target }) => {
        setFormData({...formData, [target.name]:target.value});
    };

    const [error, setError] = useState(null);


    const handleSubmit = (event) => {
        event.preventDefault();
        formData.people = Number(formData.people);
        const reservation = formData;
 
        setError(null);
        setErrorDiv(ValidateReservation(reservation))

        if(ValidateReservation(reservation).props.className !== "error alert alert-danger"){
        async function callCreateReservation() {
            try{
                await createReservation(reservation);
                query.set('date', `${formData.reservation_date}`);
                history.push(`/dashboard?date=${formData.reservation_date}`);
            }
            catch (error) {
                console.log(error);          
                setError(error.message);
                throw error;
            }
        }
        callCreateReservation();
    }
    };

    const goBack = (event) => {
        event.preventDefault();
        history.goBack();
    }


    return (
        <>
        <h3>Create a new Reservation</h3>
        <ReservationForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            formData={formData}
            goBack={goBack} />
        <div>{!errorDiv ? '' : errorDiv}</div>
        </>
    )
}
