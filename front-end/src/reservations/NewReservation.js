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

  // useEffect(() => {
  //   const date = new Date(formData.reservation_date);
  //   const current = new Date();
  //   setErrorTuesday(date.getDay() === 1);
  //   setErrorPastDate(date < current && date.getDate() !== current.getDate());
  // }, [formData.reservation_date]);

  function handleChange({ target }) {
    // console.log("handle change");
    const updatedFormData = {
      ...formData,
      [target.name]: target.value,
    };

    const inputDateParts = updatedFormData.reservation_date.match(
      /^(\d{4})-(\d{2})-(\d{2})$/
    );

    // console.log({ formdata: updatedFormData.reservation_date, inputDateParts });
    if (inputDateParts) {
      const parsedDate = new Date(
        `${inputDateParts[2]}-${inputDateParts[3]}-${inputDateParts[1]}`
      );
      const currentDate = new Date();
      // console.log({
      //   formdata: updatedFormData.reservation_date,
      //   inputDateParts,
      //   parsedDate,
      //   currentDate,
      // });
      setErrorTuesday(parsedDate.getDay() === 2);

      if (parsedDate.setHours(0, 0, 0, 0) < currentDate.setHours(0, 0, 0, 0)) {
        setErrorPastDate(true);
      } else {
        setErrorPastDate(false);
      }
    }

    setFormData(updatedFormData);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (formData.people < 1) {
      alert("Please enter at least 1 person.");
    } else {
      const abortController = new AbortController();
      formData.people = Number(formData.people);
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
          {errorTuesday || errorPastDate ? (
            <div className="alert alert-danger">
              {errorTuesday && (
                <p>Closed on Tuesdays, please select a different day.</p>
              )}
              {errorPastDate && <p>Please select a future date.</p>}
            </div>
          ) : null}
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
            disabled={errorTuesday || errorPastDate || formData.people < 1}
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
