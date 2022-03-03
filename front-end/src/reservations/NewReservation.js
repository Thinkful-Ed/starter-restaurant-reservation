import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import { formatAsDate } from "../utils/date-time";

function NewReservation() {
  const history = useHistory();

  let initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const { reservation_date } = await createReservation(formData);
    const url = `/dashboard?date=${formatAsDate(reservation_date)}`;
    history.push(url);
  }

  const handleCancel = () => {
    history.goBack();
  };
  return (
    <>
      <div className="d-flex flex-column">
        <h2>heading</h2>
        <form className="d-flex flex-column h5" onSubmit={handleSubmit}>
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            className="mb-3 form-control"
            onChange={handleChange}
            value={formData["first_name"]}
            required
          />

          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            className="mb-3 form-control"
            onChange={handleChange}
            value={formData["last_name"]}
            required
          />

          <label htmlFor="mobile_number">Mobile Number</label>
          <input
            type="text"
            id="mobile_number"
            name="mobile_number"
            className="mb-3 form-control"
            onChange={handleChange}
            value={formData["mobile_number"]}
            required
          />

          <label htmlFor="reservation_date">Reservation Date</label>
          <input
            type="date"
            id="reservation_date"
            name="reservation_date"
            className="mb-3 form-control"
            onChange={handleChange}
            value={formData["reservation_date"]}
            required
          />

          <label htmlFor="reservation_time">Reservation Time</label>
          <input
            type="time"
            id="reservation_time"
            name="reservation_time"
            className="mb-3 form-control"
            onChange={handleChange}
            value={formData["reservation_time"]}
            required
          />

          <label htmlFor="people">People</label>
          <input
            type="number"
            id="people"
            name="people"
            className="mb-3 form-control"
            onChange={handleChange}
            value={formData.people}
            min="1"
            required
          />
          <div className="mt-3">
            <button className="btn btn-primary mr-2" type="submit">
              Submit
            </button>
            <button className="btn btn-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewReservation;
