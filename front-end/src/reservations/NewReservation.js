import React, { useState, useEffect } from "react";
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
  const [errorTuesday, setErrorTuesday] = useState(false);
  const [errorPastDate, setErrorPastDate] = useState(false);
  const [errorTime, setErrorTime] = useState(false);

  function handleChange({ target }) {
    const updatedFormData = {
      ...formData,
      [target.name]: target.value,
    };

    const inputDateParts = updatedFormData.reservation_date.match(
      /^(\d{4})-(\d{2})-(\d{2})$/
    );

    if (inputDateParts) {
      const parsedDate = new Date(
        `${inputDateParts[2]}-${inputDateParts[3]}-${inputDateParts[1]}`
      );
      const currentDate = new Date();

      setErrorTuesday(parsedDate.getDay() === 2);

      if (parsedDate.setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0)) {
        setErrorPastDate(true);
      } else {
        setErrorPastDate(false);
      }
    }

    if (target.name === "reservation_time") {
      const inputTimeParts = target.value.match(/^(\d{2}):(\d{2})$/);
      if (inputTimeParts) {
        const parsedTime = new Date(
          `01/01/2007 ${inputTimeParts[1]}:${inputTimeParts[2]}:00`
        );
        const openingTime = new Date("01/01/2007 10:30:00");
        const closingTime = new Date("01/01/2007 21:30:00");
        setErrorTime(parsedTime < openingTime || parsedTime > closingTime);
      }
    }

    setFormData(updatedFormData);
  }

  async function handleSubmit(event) {
    //todo add submission validation to only display error after submit button is clicked

    event.preventDefault();

    const newErrors = [];

    if (errorTuesday) {
      newErrors.push("Closed on Tuesdays, please select a different day.");
    }
    if (errorPastDate) {
      newErrors.push("Please select a future date.");
    }
    if (errorTime) {
      newErrors.push("Please select a time between 10:30 AM and 9:30 PM.");
    }
    if (formData.people < 1) {
      newErrors.push("Please enter a number of people.");
    }
    if (errorTuesday || errorPastDate || errorTime || formData.people < 1) {
      setError({ message: newErrors });
      // console.log({ error, newErrors });
      return;
    } else {
      const abortController = new AbortController();
      const signal = abortController.signal;
      formData.people = Number(formData.people);
      try {
        // console.log({ formData });
        await axios.post(
          `${API_BASE_URL}/reservations`,
          {
            data: formData,
          },
          { signal }
        );
        history.push(`/dashboard?date=${formData.reservation_date}`);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error);
        }
      }
      return () => abortController.abort();
    }
  }
  const handleCancel = () => {
    history.goBack();
  };

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
          {/* {errorTuesday || errorPastDate || errorTime ? (
            <div className="alert alert-danger">
              {errorTuesday && (
                <p>Closed on Tuesdays, please select a different day.</p>
              )}
              {errorPastDate && <p>Please select a future date.</p>}
              {errorTime && (
                <p>Please select a time between 10:30 AM and 9:30 PM.</p>
              )}
            </div>
          ) : null} */}
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
          <button
            type="submit"
            className="btn btn-primary"
            // disabled={
            //   errorTuesday || errorPastDate || formData.people < 1 || errorTime
            // }
          >
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
