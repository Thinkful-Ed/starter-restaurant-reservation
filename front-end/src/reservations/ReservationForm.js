import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationForm() {
  const history = useHistory();
  const initialFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [reservationsErrors, setReservationsErrors] = useState(null);

  const onChangeHandler = (event) => {
    const property = event.target.name;
    const value =
      property === "people" ? Number(event.target.value) : event.target.value;

    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    history.goBack();
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const abortController = new AbortController();

    createReservation(formData, abortController.signal)
      .then(() => {
        history.push(`/dashboard?date=${formData.reservation_date}`);
      })
      .catch(setReservationsErrors);
    return () => abortController.abort();
  };

  return (
    <div>
      <ErrorAlert error={reservationsErrors} />
      <h1>Reservation Form</h1>
      <form>
        <label htmlFor="first_name">
          First Name
          <input
            type="text"
            id="first_name"
            name="first_name"
            onChange={onChangeHandler}
            value={formData.first_name}
          />
        </label>
        <label htmlFor="last_name">
          Last name
          <input
            type="text"
            id="last_name"
            name="last_name"
            onChange={onChangeHandler}
            value={formData.last_name}
          />
        </label>
        <label htmlFor="mobile_number">Mobile Number</label>
        <input
          type="text"
          id="mobile_number"
          name="mobile_number"
          onChange={onChangeHandler}
          value={formData.mobile_number}
        />
        <label htmlFor="reservation_date">Date of Reservation</label>
        <input
          type="date"
          id="reservation_date"
          name="reservation_date"
          onChange={onChangeHandler}
          value={formData.reservation_date}
        />
        <label htmlFor="reservation_time">Time of Reservation</label>
        <input
          type="time"
          id="reservation_time"
          name="reservation_time"
          onChange={onChangeHandler}
          value={formData.reservation_time}
        />
        <label htmlFor="people">Number of People in the party</label>
        <input
          type="number"
          id="people"
          name="people"
          onChange={onChangeHandler}
          value={String(formData.people)}
        />
        <div>
          <button type="button" onClick={cancelHandler}>
            Cancel
          </button>
          <button type="submit" onClick={submitHandler}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
