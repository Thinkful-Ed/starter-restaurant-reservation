import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function NewReservation({ date, setDate }) {
  const initFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  }

  const [formData, setFormData] = useState({ ...initFormState })
  const [createReservationError, setCreateReservationError] = useState(null)
  const history = useHistory();

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    setCreateReservationError(null)
    await createReservation(formData, abortController.signal)
      .catch(setCreateReservationError)
    // setFormData({ ...initFormState })
    setDate(formData.reservation_date)
    history.push(`/dashboard`)
    return () => abortController.abort();
  };

  const cancelForm = () => {
    history.goBack()
  }

  return (
    <main>
      <h1>New Reservation</h1>
      <ErrorAlert error={createReservationError} />
      <form onSubmit={handleSubmit} name="createReservation">
        <div className="form-group">
          <label for="first_name">First Name</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            onChange={handleChange}
            value={formData.first_name}
            required
          />
        </div>
        <div className="form-group">
          <label for="last_name">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            onChange={handleChange}
            value={formData.last_name}
            required
          />
        </div>
        <div className="form-group">
          <label for="mobile_number">Mobile Number</label>
          <input
            type="tel"
            className="form-control"
            id="mobile_number"
            name="mobile_number"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            onChange={handleChange}
            value={formData.mobile_number}
            required
          />
        </div>
        <div className="form-group">
          <label for="reservation_date">Date</label>
          <input
            type="date"
            className="form-control"
            id="reservation_date"
            name="reservation_date"
            onChange={handleChange}
            value={formData.reservation_date}
            required
          />
        </div>
        <div className="form-group">
          <label for="reservation_time">Time</label>
          <input
            type="time"
            className="form-control"
            id="reservation_time"
            name="reservation_time"
            onChange={handleChange}
            value={formData.reservation_time}
            required
          />
        </div>
        <div className="form-group">
          <label for="people">People</label>
          <input
            type="number"
            min={1}
            className="form-control"
            id="people"
            name="people"
            onChange={handleChange}
            value={formData.people}
            required
          />
        </div>
        <button onClick={cancelForm} className="btn btn-secondary mx-2">Cancel</button>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </main>
  )
}

export default NewReservation