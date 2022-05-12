import React, { useState } from "react";
import { postReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom";

function NewReservation() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });
  const [error, setError] = useState(null);
  const history = useHistory();

  async function submitHandle(event) {
    event.preventDefault();
    try {
      form.people = parseInt(form.people)
      const newPost = await postReservation(form);
      if (newPost.error) {
        throw newPost.error;
      }
      history.push(`/dashboard?date=${form.reservation_date}`);
    } catch (err) {
      setError(err);
    }
  }

  function cancelHandle() {
    history.goBack();
  }

  function changeHandle(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  return (
    <div>
      <form onSubmit={submitHandle}>
        <ErrorAlert error={error} />
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          name="first_name"
          id="firstName"
          onChange={changeHandle}
          value={form?.first_name}
        />
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          name="last_name"
          id="lastName"
          onChange={changeHandle}
          value={form?.last_name}
        />
        <label htmlFor="mobile_number">Mobile Number</label>
        <input
          type="tel"
          id="mobile_number"
          name="mobile_number"
          onChange={changeHandle}
          value={form?.mobile_number}
        />
        <label htmlFor="reservation_date">Reservation Date</label>
        <input
          type="date"
          name="reservation_date"
          id="reservationDate"
          onChange={changeHandle}
          value={form?.reservation_date}
        />
        <label htmlFor="reservation_time">Reservation Time</label>
        <input
          type="time"
          name="reservation_time"
          id="reservationTime"
          onChange={changeHandle}
          value={form?.reservation_time}
        />
        <label htmlFor="people">Number of People</label>
        <input
          type="number"
          name="people"
          id="people"
          onChange={changeHandle}
          value={form?.people}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={cancelHandle}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default NewReservation;
