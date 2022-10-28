import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createReservation } from "../utils/api";

function ReservationForm({reservation} = null) {
    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0
    }
    const history = useHistory();

    const [formData, setFormData] = useState(reservation ? reservation : initialFormState);
    const [formError, setFormError] = useState(null);

    const handleChange = ({ target }) => {
        const value = target.id === "people" ? parseInt(target.value) : target.value;

        setFormData({
            ...formData,
            [target.name]: value
        });
    }

    const handleNewSubmit = async (event) => {
        event.preventDefault();
            
        try {
            const res = await createReservation(formData);
            history.push(`/dashboard?date=${res.reservation_date}`);  
        } catch (error) {
            setFormError(error);
        }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        history.goBack();
    }

    return (
        <>
            <ErrorAlert error={formError}/>

            <form onSubmit={handleNewSubmit}>
                <label htmlFor="first_name">
                    First Name: 
                <input 
                    id="first_name"
                    type="text"
                    name="first_name"
                    onChange={handleChange}
                    value={formData.first_name}
                />
                </label>
                <br />
                <label htmlFor="last_name">
                    Last Name:
                    <input
                        id="last_name"
                        type="text"
                        name="last_name"
                        required
                        onChange={handleChange}
                        value={formData.last_name}
                    />
                </label>
                <br />
                <label htmlFor="mobile_number">
                    Mobile Number:
                    <input
                        id="mobile_number"
                        type="tel"
                        name="mobile_number"
                        required
                        onChange={handleChange}
                        value={formData.mobile_number}
                    />
                </label>
                <br />
                <label htmlFor="reservation_date">
                    Date:
                    <input
                        id="reservation_date"
                        type="date"
                        name="reservation_date"
                        placeholder="YYYY-MM-DD"
                        required pattern="\d{4}-\d{2}-\d{2}"
                        onChange={handleChange}
                        value={formData.reservation_date}
                    />
                </label>
                <br />
                <label htmlFor="reservation_time">
                    Time:
                    <input
                        id="reservation_time"
                        type="time"
                        name="reservation_time"
                        placeholder="HH:MM"
                        required pattern="[0-9]{2}:[0-9]{2}"
                        onChange={handleChange}
                        value={formData.reservation_time}
                    />
                </label>
                <br />
                <label htmlFor="people">
                    People:
                    <input
                        id="people"
                        type="number"
                        name="people"
                        required
                        onChange={handleChange}
                        value={formData.people}
                    />
                </label>
                <br />
                <button className="btn btn-primary" type="submit">Submit</button>
                <button className="btn btn-danger ml-3" type="button" onClick={handleCancel}>Cancel</button>
            </form>
        </>

    )

}

export default ReservationForm;
