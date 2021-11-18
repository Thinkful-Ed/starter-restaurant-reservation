import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createReservation } from "../utils/api";
import { isNotOnTuesday } from "../utils/date-time";
import { isInTheFuture } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";

export default function Reservations() {
  const history = useHistory();
  const [reservationsError, setReservationsError] = useState(null);
  const initialFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  const [formData, setFormData] = useState({ ...initialFormData });

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const findErrors = (date, errors) => {
    isNotOnTuesday(date, errors);
    isInTheFuture(date, errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const controller = new AbortController();
    const errors = [];
    findErrors(formData.reservation_date, errors);
    if (errors.length) {
      setReservationsError({ message: errors });
      return;
    }
    try {
      formData.people = Number(formData.people);
      await createReservation(formData, controller.signal);
      const date = formData.reservation_date;
      history.push(`/dashboard?date=${date}`);
    } catch (error) {
      setReservationsError(error);
    }
    return () => controller.abort();
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <>
      <ErrorAlert error={reservationsError} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          className="form-control"
          id="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleFormChange}
          required
        />
        <input
          type="text"
          name="last_name"
          className="form-control"
          id="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleFormChange}
          required
        />
        <input
          type="tel"
          name="mobile_number"
          className="form-control"
          id="mobile_number"
          placeholder="Mobile Number"
          value={formData.mobile_number}
          onChange={handleFormChange}
          required
        />
        <input
          type="number"
          name="people"
          className="form-control"
          id="people"
          placeholder="Number of guests"
          value={formData.people}
          onChange={handleFormChange}
          required
          min="1"
        />
        <input
          type="date"
          name="reservation_date"
          className="form-control"
          id="reservation_date"
          placeholder="YYY-MM-DD"
          value={formData.reservation_date}
          onChange={handleFormChange}
          required
        />
        <input
          type="time"
          name="reservation_time"
          className="form-control"
          id="reservation_time"
          placeholder="HH:MM"
          value={formData.reservation_time}
          onChange={handleFormChange}
          required
        />
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
      </form>
    </>
  );
}
