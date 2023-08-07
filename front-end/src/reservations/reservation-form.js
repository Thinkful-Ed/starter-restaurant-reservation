import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


function ReservationForm() {
    const history = useHistory();

    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
    };

    const [formData, setFormData] = useState({ ...initialFormState });
    const handleChange = ({ target }) => {
        setFormData ({
            ...formData,
            [target.name]: target.value,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted:", formData);
        setFormData({ ...initialFormState });
        history.push("/dashboard");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label id="first_name">First Name:</label>
                <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    onChange={handleChange}
                    value={formData.first_name}
                    required
                />
                <label>Last Name:</label>
                <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    onChange={handleChange}
                    value={formData.last_name}
                    required
                />
                <label>Mobile Number:</label>
                <input
                    id="mobile_number"
                    name="mobile_number"
                    type="tel"
                    onChange={handleChange}
                    value={formData.mobile_number}
                    required
                />
                <label>Date of Reservation:</label>
                <input
                    id="reservation_date"
                    name="reservation_date"
                    type="date"
                    onChange={handleChange}
                    value={formData.reservation_date}
                    required
                />
                <label>Time of Reservation:</label>
                <input
                    id="reservation_time"
                    name="reservation_time"
                    type="time"
                    onChange={handleChange}
                    value={formData.reservation_time}
                    required
                />
                <label>Group Size:</label>
                <input
                    id="people"
                    name="people"
                    type="text"
                    onChange={handleChange}
                    value={formData.people}
                    required
                />
            <button type="submit">Submit</button>
            
            <button type="button" onClick={history.goBack}>Cancel</button>
            </form>
        </div>
    )
}

export default ReservationForm;