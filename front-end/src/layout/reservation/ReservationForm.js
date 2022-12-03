import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function reservationForm() {
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
    status: null,
  };

  const [reservation, setReservation] = useState(...initialFormState);

  const handleChange = ({ target }) => {
    setReservation({
      ...reservation,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted", reservation);
    setReservation({ ...initialFormState });
  };

  return (
    <form name="reservation-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="first_name">First Name: </label>
        <input
          id="first_name"
          type="text"
          name="first_name"
          onChange={handleChange}
          value={reservation.first_name}
          required
        />
      </div>
      <div>
        <label htmlFor="last_name">Last Name: </label>
        <input
          id="last_name"
          type="text"
          name="last_name"
          onChange={handleChange}
          value={reservation.last_name}
          required
        />
      </div>
      <div>
        <label htmlFor="mobile_number">Mobile Number: </label>
        <input
          id="mobile_number"
          type="text"
          name="mobile_number"
          onChange={handleChange}
          value={reservation.mobile_number}
          required
        />
      </div>
      <div>
        <label htmlFor="reservation_date">Reservation Date: </label>
        <input
          id="reservation_date"
          type="text"
          name="reservation_date"
          onChange={handleChange}
          value={reservation.reservation_date}
          required
        />
      </div>
      <div>
        <label htmlFor="reservation_time">Reservation Time: </label>
        <input
          id="reservation_time"
          type="text"
          name="reservation_time"
          onChange={handleChange}
          value={reservation.reservation_time}
          required
        />
      </div>
      <div>
        <label htmlFor="people">People: </label>
        <input
          id="people"
          type="text"
          name="people"
          onChange={handleChange}
          value={reservation.people}
          required
        />
      </div>
      <button
        type="button"
        className="btn btn-secondary mr-2"
        onClick={() => history.goBack()}
      >
        Cancel
      </button>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default ReservationForm;
