import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function NewReservation() {
    const history = useHistory();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        party_size: 0,
    });

    function changeHandler({target}) {
        setFormData({...formData, [target.name]: target.value});
    }

    function submitHandler(event) {
        event.preventDefault();

        history.push(`/dashboard?date=${formData.reservation_date}`);
    }

    return (
        <form>
            <label htmlFor="first_name">First Name</label>
            <input name="first_name" id="first_name" type="text" onChange={changeHandler} value={formData.first_name} required />

            <label htmlFor="last_name">Last Name</label>
            <input name="last_name" id="last_name" type="text" onChange={changeHandler} value={formData.last_name} required />

            <label htmlFor="mobile_number">Mobile Number</label>
            <input name="mobile_number" id="mobile_number" type="tel" onChange={changeHandler} value={formData.mobile_number} required />

            <label htmlFor="reservation_date">Reservation Date</label>
            <input name="reservation_date" id="reservation_date" type="date" onChange={changeHandler} value={formData.reservation_date} required />

            <label htmlFor="reservation_time">Reservation Time</label>
            <input name="reservation_time" id="reservation_time" type="time" onChange={changeHandler} value={formData.reservation_time} required />

            <label htmlFor="party_size">Party Size</label>
            <input name="party_size" id="party_size" type="number" min="1" onChange={changeHandler} value={formData.party_size} required />

            <button type="submit" onClick={submitHandler}>Submit</button>
            <button type="button" onClick={history.goBack}>Cancel</button>
        </form>
    );
}

export default NewReservation;