import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function ReservationsNew() {
  const initialReservation = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const history = useHistory();

  const [formData, setFormData] = useState({ ...initialReservation });

  const handleChange = ({ target }) => {
    setFormData({
      ...setFormData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted:", formData);
    setFormData({ ...initialReservation });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="first_name">
        Please Enter Your First Name:
        <input
          id="first_name"
          type="text"
          name="first_name"
          onChange={handleChange}
          value={FormData.first_name}
        />
      </label>
      <br />
      <label htmlFor="last_name">
        Please Enter Your Last Name:
        <input
          id="last_name"
          type="text"
          name="last_name"
          onChange={handleChange}
          value={formData.last_name}
        />
      </label>
      <br />
      <label htmlFor="mobile_number">
        Please Enter Your Phone Number Without Spaces or Dashes:
        <input
          id="mobile_number"
          type="number"
          name="mobile_number"
          onChange={handleChange}
          value={formData.mobile_number}
        />
      </label>
      <br />
      <label htmlFor="reservation_date">
        Please Enter Your Reservation Date YY/MM/DD:
        <input
          id="reservation_date"
          type="date"
          name="reservation_date"
          onChange={handleChange}
          value={formData.reservation_date}
        />
      </label>
      <br />
      <label htmlFor="reservation_time">
        Please Enter The Time You Would Like to Reserve:
        <input
          id="reservation_time"
          type="time"
          name="reservation_time"
          onChange={handleChange}
          value={formData.reservation_time}
        />
      </label>
      <br />
      <label htmlFor="people">
        Please Enter the Number of Guests In Your Party:
        <input
          id="people"
          type="number"
          name="people"
          onChange={handleChange}
          value={formData.people}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
      <button type="cancel" onClick={() => history.go(-1)}>
        Cancel
      </button>
    </form>
  );
}

export default ReservationsNew;
