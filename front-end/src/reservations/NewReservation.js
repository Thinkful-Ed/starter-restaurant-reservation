import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import { formatAsDate } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";

function NewReservation() {
  const history = useHistory();
  const [reservationsError, setReservationsError] = useState(null);

  let initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = ({ target: { name, value } }) => {
    setFormData({ ...formData, [name]: value });
  };

  function validate(reservation) {
    const errors = [];

    function isFutureDate({ reservation_date, reservation_time }) {
      const resDate = new Date(`${reservation_date}T${reservation_time}`);
      if (resDate < new Date())
        errors.push(
          new Error(
            "Reservation must be set in the future. Please select another date or time."
          )
        );
    }

    function isTuesday({ reservation_date }) {
      const day = new Date(reservation_date).getUTCDay();
      if (day === 2)
        errors.push(
          new Error(
            "The restaurant is closed on Tuesdays. Please select another day."
          )
        );
    }

    function isBusinessHours({ reservation_time }) {
      const hour = parseInt(reservation_time.split(":")[0]);
      const mins = parseInt(reservation_time.split(":")[1]);

      if (hour <= 10 && mins <= 30)
        errors.push(
          new Error(
            "The restaurant opens at 10:30 AM. Please select another time."
          )
        );

      if (hour >= 22 || (hour === 21 && mins >= 30))
        errors.push(
          new Error(
            "The restaurant closes at 10:30 PM. Please select a time before 9:30 PM."
          )
        );
    }

    isFutureDate(reservation);
    isTuesday(reservation);
    isBusinessHours(reservation);

    return errors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const formErrors = validate(formData);
    if (formErrors.length) {
      console.error(formErrors);
      return setReservationsError(formErrors);
    }

    try {
      const { reservation_date } = await createReservation(formData);
      const url = `/dashboard?date=${formatAsDate(reservation_date)}`;
      history.push(url);
    } catch (err) {
      console.error(err);
      setReservationsError(err);
    }
  }

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <>
      <div className="d-flex flex-column">
        <ErrorAlert error={reservationsError} />
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
            <button
              className="btn btn-primary mr-2"
              type="submit"
            >
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
