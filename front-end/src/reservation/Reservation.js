import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { today } from "../utils/date-time";

function Reservation() {
  const history = useHistory();
  const initialFormState = {
    first_name: null,
    last_name: null,
    mobile_number: null,
    reservation_date: null,
    reservation_time: null,
    people: null,
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [errors, setErrors] = useState([]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]:
        target.name === "people" ? Number(target.value) : target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateDate()) {
      history.push(`/dashboard?date=${formData.reservation_date}`);
    }
  };

  function validateDate() {
    const reserveDate = new Date(formData.reservation_date);
    const todaysDate = new Date();
    const foundErrors = [];

    if (reserveDate.getDay() === 2) {
      foundErrors.push({
        message:
          "Reservations cannot be made on a Tuesday (Restaurant is closed).",
      });
    }

    if (reserveDate < todaysDate) {
      foundErrors.push({
        message: "Reservations cannot be made in the past.",
      });
    }

    setErrors(foundErrors);

    if (foundErrors.length > 0) {
      return false;
    }
    return true;
  }

  const reserveErrors = () => {
    return errors.map((error, idx) => <ErrorAlert key={idx} error={error} />);
  }

  return (
      <form onSubmit={handleSubmit}>
        {reserveErrors()}
        <div className="form-group">
          <label htmlFor="name">First Name:</label>
          <input
            className="form-control"
            id="name"
            name="first_name"
            type="text"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Last Name:</label>
          <input
            className="form-control"
            id="name"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="tel">Mobile Number:</label>
          <input
            className="form-control"
            id="tel"
            name="mobile_number"
            type="tel"
            placeholder="xxx-xxx-xxxx"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            value={formData.mobile_number}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date of Reservation:</label>
          <input
            className="form-control"
            id="date"
            name="reservation_date"
            type="date"
            value={formData.reservation_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time of Reservation:</label>
          <input
            className="form-control"
            id="time"
            name="reservation_time"
            type="time"
            value={formData.reservation_time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="tel">Party Size:</label>
          <input
            className="form-control"
            id="size"
            name="people"
            type="number"
            value={formData.people}
            onChange={handleChange}
            min="1"
            step="1"
            required
          />
        </div>
        <br />
        <button
          onClick={() => history.push("/")}
          type="button"
          className="btn btn-secondary mr-2"
        >
          Cancel
        </button>
        <button className="btn btn-primary" type="submit" value="Submit">
          Submit
        </button>
      </form>
  );
}

export default Reservation;
