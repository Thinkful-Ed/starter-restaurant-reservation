import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ErrorAlert from "../layout/ErrorAlert";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

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
  const [error, setError] = useState(null);

  function handleChange({ target }) {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }
  const handleCancel = () => {
    history.goBack();
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (formData.people < 1) {
      alert("Please enter at least 1 person.");
    } else {
      const abortController = new AbortController();

      try {
        axios.post(`${API_BASE_URL}/reservations`, {
          data: formData,
        });
        history.push(`/dashboard?date=${formData.reservation_date}`);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error);
        }
      }
      return () => abortController.abort();
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            className="form-control"
            id="first_name"
            name="first_name"
            type="text"
            onChange={handleChange}
            value={formData.first_name}
            required
          />
          <label htmlFor="last_name">Last Name</label>
          <input
            className="form-control"
            id="last_name"
            name="last_name"
            type="text"
            onChange={handleChange}
            value={formData.last_name}
            required
          />
          <label htmlFor="mobile_number">Mobile Number</label>
          <input
            className="form-control"
            id="mobile_number"
            name="mobile_number"
            type="tel"
            onChange={handleChange}
            value={formData.mobile_number}
            required
          />
          <label htmlFor="reservation_date">Reservation Date</label>
          <input
            className="form-control"
            id="reservation_date"
            name="reservation_date"
            type="date"
            onChange={handleChange}
            value={formData.reservation_date}
            required
          />
          <label htmlFor="reservation_time">Reservation Time</label>
          <input
            className="form-control"
            id="reservation_time"
            name="reservation_time"
            type="time"
            onChange={handleChange}
            value={formData.reservation_time}
            required
          />
          <label htmlFor="people">Number of People</label>
          {/* to do: add form level validator to the number of people field to ensure at least 1 person is entered  */}
          <input
            className="form-control"
            id="people"
            name="people"
            type="number"
            onChange={handleChange}
            value={formData.people}
            required
          />
        </div>
        <div className="btn-group">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
      <ErrorAlert error={error} />
    </div>
  );
}

export default NewReservation;
