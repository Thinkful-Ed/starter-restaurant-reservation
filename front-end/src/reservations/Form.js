import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Cancel from "../buttons/Cancel";
import Submit from "../buttons/Submit";
import { createReservation } from "../utils/api";
import ErrorHandler from "./ErrorHandler";

function Form({ date }) {
  const history = useHistory();
  const [formData, setFormData] = useState([]);

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: null,
    reservation_time: null,
    people: null,
  };

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async function (e) {
    e.preventDefault();
    const reservation = await createReservation(formData);
    const reservationDate = reservation.reservation_date;
    const date = new Date(reservationDate);
    // Set up query param for reservation date
    history.push(`/dashboard/?date=${date}`);
    setFormData({ ...initialFormState });
  };

  return (
    <div>
      <h1>Create Reservation</h1>
      <ErrorHandler />
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label for="first_name">First Name</label>
          <input
            className="form-control"
            id="first_name"
            name="first_name"
            placeholder="First Name"
            onChange={handleChange}
            value={formData.first_name}
          />
          <label for="last_name">Last Name</label>
          <input
            className="form-control"
            id="last_name"
            name="last_name"
            placeholder="Last Name"
            onChange={handleChange}
            value={formData.last_name}
          />
          <label for="mobile_number">Mobile Name</label>
          <input
            className="form-control"
            id="mobile_number"
            name="mobile_number"
            placeholder="Mobile Number"
            onChange={handleChange}
            value={formData.mobile_number}
          />
          <label for="reservation_date">Date</label>
          <input
            type="date"
            className="form-control"
            id="reservation_date"
            name="reservation_date"
            placeholder="YYYY-MM-DD"
            pattern="\d{4}-\d{2}-\d{2}"
            onChange={handleChange}
            value={date}
          />
          <label for="reservation_time">Time</label>
          <input
            type="time"
            className="form-control"
            id="reservation_time"
            name="reservation_time"
            placeholder="HH:MM"
            pattern="[0-9]{2}:[0-9]{2}"
            onChange={handleChange}
            value={formData.reservation_time}
          />
          <label for="people">People</label>
          <input
            className="form-control"
            id="people"
            name="people"
            onChange={handleChange}
            value={formData.people}
          />
        </fieldset>
        <Cancel />
        <Submit />
      </form>
    </div>
  );
}

export default Form;
