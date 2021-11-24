import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Cancel from "../buttons/Cancel";
import Submit from "../buttons/Submit";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Form() {
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const history = useHistory();

  const [reservation, setReservation] = useState({ ...initialFormState });
  const [errors, setErrors] = useState(null);

  const handleSubmit = async function (e) {
    e.preventDefault();
    try {
      let savedReservation = await createReservation(reservation);
      let reservationDate = savedReservation.data.reservation_date;
      // Set up query param for reservation date
      history.push(`/dashboard/?date=${reservationDate.slice(0, 10)}`);
      setReservation({ ...initialFormState });
    } catch (err) {
      setErrors(err);
    }
  };

  const handleChange = ({ target }) => {
    setReservation({
      ...reservation,
      [target.name]:
        target.name === "people" ? Number(target.value) : target.value,
    });
  };

  return (
    <div>
      <h1>Create Reservation</h1>
      <ErrorAlert error={errors}/>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>First Name</label>
          <input
            className="form-control"
            id="first_name"
            name="first_name"
            placeholder="First Name"
            onChange={handleChange}
            value={reservation.first_name}
          />
          <label>Last Name</label>
          <input
            className="form-control"
            id="last_name"
            name="last_name"
            placeholder="Last Name"
            onChange={handleChange}
            value={reservation.last_name}
          />
          <label>Mobile Number</label>
          <input
            className="form-control"
            id="mobile_number"
            name="mobile_number"
            placeholder="Mobile Number"
            onChange={handleChange}
            value={reservation.mobile_number}
          />
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            id="reservation_date"
            name="reservation_date"
            placeholder="YYYY-MM-DD"
            pattern="\d{4}-\d{2}-\d{2}"
            onChange={handleChange}
            value={reservation.reservation_date}
          />
          <label>Time</label>
          <input
            type="time"
            className="form-control"
            id="reservation_time"
            name="reservation_time"
            placeholder="HH:MM"
            pattern="[0-9]{2}:[0-9]{2}"
            onChange={handleChange}
            value={reservation.reservation_time}
          />
          <label>People</label>
          <input
            className="form-control"
            id="people"
            name="people"
            onChange={handleChange}
            value={Number(reservation.people)}
          />
        </fieldset>
        <Cancel />
        <Submit />
      </form>
    </div>
  );
}

export default Form;
