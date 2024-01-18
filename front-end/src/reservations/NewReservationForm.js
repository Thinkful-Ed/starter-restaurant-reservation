import React from "react";
import { useHistory } from "react-router-dom";

export default function ReservationForm({
  formData,
  handleChange,
  handleSubmit,
}) {
  const history = useHistory();

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          onchange={handleChange}
          placeholder="First Name"
          value={formData.first_name}
          required
        ></input>
      </div>
      <br />
      <div>
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          onChange={handleChange}
          placeholder="Last Name"
          value={formData.last_name}
          required
        ></input>
      </div>
      <br />
      <div>
        <label htmlFor="mobile_number">Mobile Number</label>
        <input
          type="text"
          id="mobile_number"
          name="mobile_number"
          onChange={handleChange}
          placeholder="Mobile Number"
          value={formData.mobile_number}
          required
        ></input>
      </div>
      <br />
      <div>
        <label htmlFor="reservation_date">Date of Reservation</label>
        <input
          type="date"
          id="reservation_date"
          name="reservation_date"
          onChange={handleChange}
          value={formData.reservation_date}
          required
        ></input>
      </div>
      <br />
      <div>
        <label htmlFor="reservation_time">Time of Reservation</label>
        <input
          type="time"
          id="reservation_time"
          name="reservation_time"
          onChange={handleChange}
          value={formData.reservation_time}
          required
        ></input>
      </div>
      <br />
      <div>
        <label htmlFor="people">Number of People in Your Group</label>
        <input
          type="number"
          id="people"
          name="people"
          onChange={handleChange}
          value={formData.people}
          min="1"
          required
        ></input>
      </div>
      <br />
      <button type="submit">Submit</button>
      <button type="button" onClick={() => history.push("/dashboard")}>
        Cancel
      </button>
    </form>
  );
}
