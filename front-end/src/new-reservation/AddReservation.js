import React, { useEffect, useState } from "react";
import { createReservation } from "../utils/api";
import { useHistory } from "react-router-dom";

function AddReservation() {
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const [reservationError, setReservationError] = useState(null);

  const history = useHistory();

  function addReservation() {
    const abortController = new AbortController();
    setReservationError(null);
    createReservation(formData, abortController.signal)
      .then((info) => {
        console.log("Created!", info);
        history.push(`/dashboard?date=${formData.reservation_date}`);
      })
      .catch(setReservationError);
    return () => abortController.abort();
  }

  const handleChange = ({ target }) => {
    if (target.name === "people") {
      setFormData({
        ...formData,
        [target.name]: Number(target.value),
      });
    } else {
      setFormData({
        ...formData,
        [target.name]: target.value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addReservation();
  };

  useEffect(() => {
    console.log(reservationError);
  }, [reservationError]);

  return (
    <form onSubmit={handleSubmit}>
      {reservationError ? (
        <div className="alert alert-danger">
          <p>{reservationError.message}</p>
        </div>
      ) : null}
      <fieldset>
        <legend>Reservation Information</legend>
        <div>
          <label htmlFor="first_name">First Name:</label>
          <input
            id="first_name"
            type="text"
            name="first_name"
            placeholder="Enter your first name"
            onChange={handleChange}
            value={formData.first_name}
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name:</label>
          <input
            id="last_name"
            type="text"
            name="last_name"
            placeholder="Enter your last name"
            onChange={handleChange}
            value={formData.last_name}
          />
        </div>
        <div>
          <label htmlFor="mobile_number">Phone #:</label>
          <input
            id="mobile_number"
            type="text"
            name="mobile_number"
            pattern="\d{3}[\-]\d{3}[\-]\d{4}"
            placeholder="xxx-xxx-xxxx"
            onChange={handleChange}
            value={formData.mobile_number}
          />
        </div>
        <div>
          <label htmlFor="reservation_date">Reservation Date:</label>
          <input
            id="reservation_date"
            type="date"
            name="reservation_date"
            placeholder="YYYY-MM-DD"
            pattern="(?:19|20)\[0-9\]{2}-(?:(?:0\[1-9\]|1\[0-2\])-(?:0\[1-9\]|1\[0-9\]|2\[0-9\])|(?:(?!02)(?:0\[1-9\]|1\[0-2\])-(?:30))|(?:(?:0\[13578\]|1\[02\])-31))"
            title="Enter a date in this format YYYY-MM-DD"
            onChange={handleChange}
            value={formData.reservation_date}
          />
        </div>
        <div>
          <label htmlFor="reservation_time">Reservation Time:</label>
          <input
            type="time"
            id="reservation_time"
            name="reservation_time"
            onChange={handleChange}
            value={formData.reservation_time}
          />
        </div>
        <div>
          <label htmlFor="people">Party Size:</label>
          <input
            id="people"
            type="number"
            name="people"
            placeholder="Enter the party size"
            onChange={handleChange}
            value={formData.people}
          />
        </div>
      </fieldset>
      <button type="submit">Submit</button>
      <button type="cancel" onClick={history.goBack}>
        Cancel
      </button>
    </form>
  );
}

export default AddReservation;
