import { useHistory } from "react-router-dom";
import { useState } from "react";
import { createReservation } from "../utils/api";

function NewReservation() {
  const history = useHistory();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });

  const handleChange = (event) => {
    const { target } = event;
    setFormData({ ...formData, [target.id]: target.value });
  };

  async function onSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    await createReservation(formData, abortController.signal);
    history.push(`/dashboard?date=${formData.reservation_date}`);
  }

  function handleCancel() {
    history.goBack();
  }

  return (
    <div>
      <h1>NEW RESERVATIONS</h1>
      <form onSubmit={onSubmit}>
        <label for="first_name">First Name</label>
        <input
          name="first_name"
          id="first_name"
          type="text"
          value={formData.first_name}
          onChange={handleChange}></input>

        <label for="last_name">Last Name</label>
        <input
          name="last_name"
          id="last_name"
          type="text"
          onChange={handleChange}></input>

        <label for="mobile_number">Mobile Number</label>
        <input
          name="mobile_number"
          id="mobile_number"
          type="tel"
          onChange={handleChange}></input>

        <label for="reservation_date">Reservation date</label>
        <input
          name="reservation_date"
          id="reservation_date"
          type="date"
          onChange={handleChange}></input>

        <label for="reservation_time">Reservation Time</label>
        <input
          name="reservation_time"
          id="reservation_time"
          type="time"
          onChange={handleChange}></input>

        <label for="people">Number of people</label>
        <input
          name="people"
          id="people"
          type="number"
          onChange={handleChange}></input>

        <button type="submit">Submit</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default NewReservation;
