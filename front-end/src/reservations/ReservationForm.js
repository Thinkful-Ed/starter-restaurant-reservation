import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import { today } from "../utils/date-time";

function ReservationForm() {
  const history = useHistory();

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: today(),
    reservation_time: "",
    people: 0,
  };
  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { reservation_date } = formData;

    formData.people = Number(formData.people);
    createReservation(formData)
      .then(setFormData({ ...initialFormState }))
      .then(history.push(`/dashboard?date=${reservation_date}`));
  };

  return (
    <>
      <h1>New Reservation</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="first_name">
          First name:
          <input
            id="first_name"
            type="text"
            name="first_name"
            onChange={handleChange}
            value={formData.first_name}
            required
          />
        </label>
        <br />
        <label htmlFor="last_name">
          Last name:
          <input
            id="last_name"
            type="text"
            name="last_name"
            onChange={handleChange}
            value={formData.last_name}
            required
          />
        </label>
        <br />
        <label htmlFor="mobile_number">
          Mobile number:
          <input
            id="mobile_number"
            type="text"
            name="mobile_number"
            placeholder="XXX-XXX-XXXX"
            onChange={handleChange}
            value={formData.mobile_number}
            required
          />
        </label>
        <br />
        <label htmlFor="reservation_date">
          Date of reservation:
          <input
            id="reservation_date"
            type="date"
            name="reservation_date"
            onChange={handleChange}
            value={formData.reservation_date}
            required
          />
        </label>
        <br />
        <label htmlFor="reservation_time">
          Time of reservation:
          <input
            id="reservation_time"
            type="time"
            name="reservation_time"
            onChange={handleChange}
            value={formData.reservation_time}
            required
          />
        </label>
        <br />
        <label htmlFor="people">
          Number of people:
          <input
            id="people"
            type="number"
            name="people"
            onChange={handleChange}
            value={formData.people}
            required
          />
        </label>
        <br />
        <button type="submit">Submit</button>
        <button type="button" onClick={() => history.goBack()}>
          Cancel
        </button>
      </form>
    </>
  );
}

export default ReservationForm;
