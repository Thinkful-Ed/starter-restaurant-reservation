import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createReservation } from "../utils/api";

function Reservation({ loadDashboard, reservations, edit }) {
  const history = useHistory();
  const { reservation_id } = useParams();
  const initialFormState = {
    first_name: null,
    last_name: null,
    mobile_number: null,
    reservation_date: null,
    reservation_time: null,
    people: null,
  };

  const [apiError, setApiError] = useState(null);
  const [formData, setFormData] = useState({ ...initialFormState });
  const [errors, setErrors] = useState([]);

  if (edit) {
    if (!reservations || !reservations.id) return null;

    const foundReservation = reservations.find(
      (reservation) => reservation.reservation_id === Number(reservation_id)
    );

    if (!foundReservation || foundReservation.status !== "booked") {
      return <p>Only booked reservations can be edited.</p>;
    }

    setFormData({
      first_name: foundReservation.first_name,
      last_name: foundReservation.last_name,
      mobile_number: foundReservation.mobile_number,
      reservation_date: foundReservation.reservation_date,
      reservation_time: foundReservation.reservation_time,
      people: foundReservation.people,
      reservation_id: foundReservation.reservation_id,
    });
  }

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]:
        target.name === "people" ? Number(target.value) : target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const foundErrors = [];
    const abortController = new AbortController();

    if (validateFields(foundErrors) && validateDate(foundErrors)) {
      createReservation(formData, abortController.signal)
        .then(loadDashboard)
        .then(() =>
          history.push(`/dashboard?date=${formData.reservation_date}`)
        )
        .catch(setApiError);
    }

    setErrors(foundErrors);
  };

  function validateFields(foundErrors) {
    for (const field in formData) {
      if (formData[field] === "") {
        foundErrors.push({
          message: `${field.split("_").join(" ")} cannot be left blank.`,
        });
      }
      return foundErrors.length === 0;
    }
  }

  function validateDate(foundErrors) {
    const reserveDate = new Date(
      `${formData.reservation_date}T${formData.reservation_time}:00.000`
    );
    const todaysDate = new Date();

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

    if (
      reserveDate.getHours() < 10 ||
      (reserveDate.getHours() === 10 && reserveDate.getMinutes() < 30)
    ) {
      foundErrors.push({
        message:
          "Reservation cannot be made: Restaurant is not open until 10:30AM.",
      });
    } else if (
      reserveDate.getHours() > 22 ||
      (reserveDate.getHours() === 22 && reserveDate.getMinutes() >= 30)
    ) {
      foundErrors.push({
        message:
          "Reservation cannot be made: Restaurant is closed after 10:30PM.",
      });
    } else if (
      reserveDate.getHours() > 21 ||
      (reserveDate.getHours() === 21 && reserveDate.getMinutes() > 30)
    ) {
      foundErrors.push({
        message:
          "Reservation cannot be made: Reservation must be made at least an hour before closing (10:30PM).",
      });

      return foundErrors.length === 0;
    }
  }
  const reserveErrors = () => {
    return errors.map((error, id) => <ErrorAlert key={id} error={error} />);
  };

  return (
    <form>
      {reserveErrors()}
      <ErrorAlert error={apiError} />
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
      <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

export default Reservation;
