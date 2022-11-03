import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { addRes } from "../utils/api";
import ReservationForm from "./ReservationForm";

function ReservationNew(){
    const history = useHistory();
    const [reservationsError, setReservationsError] = useState(null);
    
    const initialFormData = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
    };

    const [formData, setFormData] = useState({ ...initialFormData });

    function handleSubmit(event){
        const resDate = formData.reservation_date;
        event.preventDefault();
        addRes({ ...formData, 
                people: Number(formData.people),
        })
        .then(() => {
            setFormData(initialFormData);
            history.push(`/dashboard?date=${resDate}`);
        })
        .catch(setReservationsError);
    }

    function handleChange(event){
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    return (
        <>
        <ErrorAlert error={reservationsError}/>
        <ReservationForm
            initialFormData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
        </>
    )

}


export default ReservationNew;