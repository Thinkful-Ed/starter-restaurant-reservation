import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { createReservation, updateReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationForm({ reservation }) {
  const history = useHistory();

  const [createError, setCreateError] = useState(null);

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    formData.people = parseInt(formData.people);
    try {
      await createReservation(formData);
      setFormData({ ...initialFormState });
      history.push(`/dashboard?date=${formData.reservation_date}`);
    } catch (error) {
      setCreateError(error);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    formData.people = parseInt(formData.people);
    try {
      await updateReservation(formData, reservation.reservation_id);
      setFormData({ ...initialFormState });
      history.push(`/dashboard?date=${formData.reservation_date}`);
    } catch (error) {
      setCreateError(error);
    }
  };

  useEffect(fillForm, [reservation]);
  function fillForm() {
    if (reservation && Object.keys(reservation).length > 0) {
      const {
        first_name,
        last_name,
        mobile_number,
        reservation_date,
        reservation_time,
        people,
      } = reservation;
      setFormData({
        first_name,
        last_name,
        mobile_number,
        reservation_date,
        reservation_time,
        people,
      });
    }
  }

  return (
    <>
      <form>
        <div className="form-group">
          <label htmlFor="first_name">
            <b>First Name:</b>
          </label>
          <input
            name="first_name"
            id="first_name"
            type="text"
            className="form-control"
            onChange={handleChange}
            value={formData.first_name}
            placeholder="First Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="last_name">
            <b>Last Name:</b>
          </label>
          <input
            name="last_name"
            id="last_name"
            type="text"
            className="form-control"
            onChange={handleChange}
            value={formData.last_name}
            placeholder="Last Name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobile_number">
            <b>Mobile Number:</b>
          </label>
          <input
            name="mobile_number"
            id="mobile_number"
            type="tel"
            className="form-control"
            onChange={handleChange}
            value={formData.mobile_number}
            placeholder="Phone Number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reservation_date">
            <b>Reservation Date:</b>
          </label>
          <input
            name="reservation_date"
            id="reservation_date"
            type="date"
            className="form-control"
            onChange={handleChange}
            value={formData.reservation_date}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reservation_time">
            <b>Reservation Time:</b>
          </label>
          <input
            name="reservation_time"
            id="reservation_time"
            type="time"
            className="form-control"
            onChange={handleChange}
            value={formData.reservation_time}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="people">
            <b>Party of How Many:</b>
          </label>
          <input
            name="people"
            id="people"
            type="number"
            className="form-control"
            onChange={handleChange}
            value={formData.people}
            required
          />
        </div>
      </form>
      <ErrorAlert error={createError} />
      <div className="my-5">
        {reservation ? (
          <button
            type="submit"
            className="btn btn-info btn-block btn-lg"
            onClick={handleUpdate}
          >
            Submit
          </button>
        ) : (
          <button
            type="submit"
            className="btn btn-info btn-block btn-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}

        <button
          type="button"
          className="btn btn-secondary btn-block btn-lg my-3"
          onClick={() => history.goBack()}
        >
          Cancel
        </button>
      </div>
    </>
  );
}

export default ReservationForm;
